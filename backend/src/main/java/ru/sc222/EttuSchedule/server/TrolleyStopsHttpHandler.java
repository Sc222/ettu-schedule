package ru.sc222.EttuSchedule.server;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sc222.EttuSchedule.ettu.TransportApi;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.util.Arrays;

public class TrolleyStopsHttpHandler implements HttpHandler {

    private TransportApi transportApi;

    public TrolleyStopsHttpHandler(TransportApi transportApi) {
        this.transportApi = transportApi;
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        handleRequest(httpExchange);
    }

    private void handleRequest(HttpExchange httpExchange) throws IOException {
        String result = transportApi.getTrolleyStops();
        URI requestURI = httpExchange.getRequestURI();
        String response = result;
        Headers headers = httpExchange.getResponseHeaders();
        headers.add("Access-Control-Allow-Origin","http://localhost");
        headers.add("Content-Type","application/json; charset=utf-8");
        httpExchange.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = httpExchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}