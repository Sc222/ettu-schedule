package server;

import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

public class Program {

    public static void main(String[] args) {
        ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress("localhost", 8001), 0);
            server.createContext("/", new ApiLinksHttpHandler());
            server.createContext("/tram-stops", new TramStopsHttpHandler());
            server.createContext("/troll-stops", new TrollStopsHttpHandler());
            server.setExecutor(threadPoolExecutor);
            server.start();
            System.out.println("Server is live on localhost:8001");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
