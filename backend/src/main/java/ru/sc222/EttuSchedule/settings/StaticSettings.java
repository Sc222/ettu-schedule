package ru.sc222.EttuSchedule.settings;

public class StaticSettings {
    public static Settings get() {
        return settings;
    }

    private static Settings settings;
    public static void init(Settings settings)
    {
        StaticSettings.settings = settings;
    }
}
