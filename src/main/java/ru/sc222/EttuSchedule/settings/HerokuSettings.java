package ru.sc222.EttuSchedule.settings;

//todo store this settings in special place (hide from public)
public class HerokuSettings implements Settings {
    @Override
    public String getTransportApiKey() {
        return "no api key needed";
    }

    @Override
    public String getHostName() {
        return "ettu-schedule.herokuapp.com";
    }

    @Override
    public int getPort() {
        return 8000;
    }

    @Override
    public int getExecutorsCount() {
        return 10;
    }
}
