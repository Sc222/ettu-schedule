package ru.sc222.EttuSchedule.server;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import ru.sc222.EttuSchedule.ettu.TransportApi;
import ru.sc222.EttuSchedule.settings.StaticSettings;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

public class ServerUtils {

    public static HttpServer createServer(TransportApi transportApi) throws IOException {
        ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(StaticSettings.get().getExecutorsCount());
        HttpServer result = HttpServer.create(new InetSocketAddress(Integer.parseInt(System.getenv("PORT"))), 0);
        result.createContext("/", new ApiLinksHttpHandler());
        result.createContext("/tram-stops", new TramStopsHttpHandler(transportApi));
        result.createContext("/trolley-stops", new TrolleyStopsHttpHandler(transportApi));
        result.createContext("/transport-near-stops", new TransportNearStopsHttpHandler(transportApi));
        result.setExecutor(threadPoolExecutor);
        return result;
    }

    public static void sendResponse(HttpExchange httpExchange, String response, int status) throws IOException {
        Headers headers = httpExchange.getResponseHeaders();
        headers.add("Access-Control-Allow-Origin", "*"); //todo * is set for testing, remove in future
        headers.add("Content-Type","application/json; charset=utf-8");
        httpExchange.sendResponseHeaders(status, response.getBytes().length);
        OutputStream os = httpExchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}
