package ru.sc222.EttuSchedule;

import com.sun.net.httpserver.HttpServer;
import ru.sc222.EttuSchedule.ettu.EttuTransportApi;
import ru.sc222.EttuSchedule.ettu.TransportApi;
import ru.sc222.EttuSchedule.server.ApiLinksHttpHandler;
import ru.sc222.EttuSchedule.server.TramStopsHttpHandler;
import ru.sc222.EttuSchedule.server.TransportNearStopsHttpHandler;
import ru.sc222.EttuSchedule.server.TrolleyStopsHttpHandler;
import ru.sc222.EttuSchedule.settings.Sc222Settings;
import ru.sc222.EttuSchedule.settings.StaticSettings;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

public class Program {

    public static void main(String[] args) {
        StaticSettings.init(new Sc222Settings()); //call once, make your own implementation
        TransportApi transportApi = new EttuTransportApi();

        ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress("localhost", 8001), 0);
            server.createContext("/", new ApiLinksHttpHandler());
            server.createContext("/tram-stops", new TramStopsHttpHandler(transportApi));
            server.createContext("/trolley-stops", new TrolleyStopsHttpHandler(transportApi));
            server.createContext("/transport-near-stops", new TransportNearStopsHttpHandler(transportApi));
            server.setExecutor(threadPoolExecutor);
            server.start();
            System.out.println("Server is live on http://localhost:8001");
        } catch (IOException e) {
            System.out.println("AOAOAOAOOAOA");
            e.printStackTrace();
        }
    }
}
