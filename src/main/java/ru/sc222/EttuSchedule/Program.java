package ru.sc222.EttuSchedule;

import com.sun.net.httpserver.HttpServer;
import ru.sc222.EttuSchedule.ettu.EttuTransportApi;
import ru.sc222.EttuSchedule.ettu.TransportApi;
import ru.sc222.EttuSchedule.server.ServerUtils;
import ru.sc222.EttuSchedule.settings.HerokuSettings;
import ru.sc222.EttuSchedule.settings.StaticSettings;

import java.io.IOException;

public class Program {

    public static void main(String[] args) {
        StaticSettings.init(new HerokuSettings()); //call once, make your own implementation
        TransportApi transportApi = new EttuTransportApi();
        try {
            HttpServer server = ServerUtils.createServer(transportApi);
            server.start();
            System.out.println("Server is live on https//:ettu-schedule.herokuapp.com:8000");
        } catch (IOException e) {
            System.out.println("Error running server");
            e.printStackTrace();
        }
    }
}
