package ru.sc222.EttuSchedule;

import com.sun.net.httpserver.HttpServer;
import ru.sc222.EttuSchedule.ettu.EttuTransportApi;
import ru.sc222.EttuSchedule.ettu.TransportApi;
import ru.sc222.EttuSchedule.server.ServerUtils;
import ru.sc222.EttuSchedule.settings.Sc222Settings;
import ru.sc222.EttuSchedule.settings.StaticSettings;

import java.io.IOException;

public class Program {

    public static void main(String[] args) {
        StaticSettings.init(new Sc222Settings()); //call once, make your own implementation
        TransportApi transportApi = new EttuTransportApi();
        try {
            HttpServer server = ServerUtils.createServer(transportApi);
            server.start();
            System.out.println("Server is live on http://localhost:8001");
        } catch (IOException e) {
            System.out.println("Error running server");
            e.printStackTrace();
        }
    }
}
