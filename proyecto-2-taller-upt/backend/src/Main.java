import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import java.sql.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/messages", Main::handleMessages);
        server.setExecutor(null);
        System.out.println("Server running on port 8080");
        server.start();
    }

    private static void handleMessages(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:messages.db")) {
            if (method.equalsIgnoreCase("GET")) {
                handleGet(exchange, conn);
            } else if (method.equalsIgnoreCase("POST")) {
                handlePost(exchange, conn);
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            exchange.sendResponseHeaders(500, -1);
        }
    }

    private static void handleGet(HttpExchange exchange, Connection conn) throws IOException, SQLException {
        // Maneja scroll infinito con offset y limit
        String query = exchange.getRequestURI().getQuery();
        int offset = 0;
        int limit = 5;
        if (query != null) {
            for (String param : query.split("&")) {
                String[] parts = param.split("=");
                if (parts.length == 2) {
                    if ("offset".equals(parts[0])) offset = Integer.parseInt(parts[1]);
                    if ("limit".equals(parts[0])) limit = Integer.parseInt(parts[1]);
                }
            }
        }
        String sql = "SELECT * FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, limit);
        stmt.setInt(2, offset);
        ResultSet rs = stmt.executeQuery();
        StringBuilder response = new StringBuilder();
        response.append("[");
        boolean first = true;
        while (rs.next()) {
            if (!first) response.append(",");
            response.append("{\"id\":").append(rs.getInt("id"))
                    .append(",\"user\":\"").append(rs.getString("user")).append("\"")
                    .append(",\"content\":\"").append(rs.getString("content")).append("\"")
                    .append(",\"created_at\":\"").append(rs.getString("created_at")).append("\"}");
            first = false;
        }
        response.append("]");
        byte[] bytes = response.toString().getBytes();
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }

    private static void handlePost(HttpExchange exchange, Connection conn) throws IOException, SQLException {
        String body = new BufferedReader(new InputStreamReader(exchange.getRequestBody()))
                .lines().collect(Collectors.joining("\n"));
        String sql = "INSERT INTO messages (user, content) VALUES (?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        // Espera JSON simple: {"user":"...","content":"..."}
        String user = body.replaceAll(".*\\\"user\\\":\\\"([^\\\"]+).*", "$1");
        String content = body.replaceAll(".*\\\"content\\\":\\\"([^\\\"]+).*", "$1");
        pstmt.setString(1, user);
        pstmt.setString(2, content);
        pstmt.executeUpdate();
        exchange.sendResponseHeaders(201, -1);
    }
}