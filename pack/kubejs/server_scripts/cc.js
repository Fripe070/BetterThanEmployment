ServerEvents.recipes((event) => {
    event.remove("computercraft:cable");
    event.shaped("6x computercraft:cable", [" # ", "#R#", " # "], {
        "#": "create:andesite_alloy",
        R: "#c:dusts/redstone",
    });

    event.remove("computercraft:computer_normal");
    event.shaped("computercraft:computer_normal", ["###", "#R#", "#G#"], {
        "#": "create:andesite_alloy",
        G: "#c:glass_panes",
        R: "create_connected:control_chip",
    });
    event.remove("computercraft:computer_advanced");
    event.shaped("computercraft:computer_advanced", ["###", "#R#", "#G#"], {
        "#": "create:brass_ingot",
        G: "#c:glass_panes",
        R: "#c:circuits/advanced",
    });
    event.remove("computercraft:computer_advanced_upgrade");
    event.shaped("computercraft:computer_advanced", ["# #", "#C#", "#R#"], {
        "#": "create:brass_ingot",
        C: "computercraft:computer_normal",
        R: "#c:circuits/advanced",
    });

    event.remove("computercraft:monitor_normal");
    event.shaped("computercraft:monitor_normal", ["###", "#G#", "#R#"], {
        "#": "create:andesite_alloy",
        G: "#c:glass_panes",
        R: "#c:dusts/redstone",
    });
    event.remove("computercraft:monitor_advanced");
    event.shaped("4x computercraft:monitor_advanced", ["###", "#G#", "#E#"], {
        "#": "create:brass_ingot",
        G: "#c:glass_panes",
        E: "create:electron_tube",
    });

    event.remove("computercraft:printer");
    event.shaped("computercraft:printer", ["#P#", "#R#", "#D#"], {
        "#": "create:andesite_alloy",
        D: "#c:dyes",
        P: "minecraft:paper",
        R: "create_connected:control_chip",
    });
    event.remove("computercraft:speaker");
    event.shaped("computercraft:speaker", ["###", "#N#", "#R#"], {
        "#": "create:andesite_alloy",
        N: "minecraft:note_block",
        R: "create_connected:control_chip",
    });
    event.remove("computercraft:redstone_relay");
    event.shaped("computercraft:redstone_relay", ["SRS", "RCR", "SRS"], {
        C: "computercraft:wired_modem",
        R: "#c:dusts/redstone",
        S: "create:andesite_alloy",
    });
    event.remove("computercraft:disk_drive");
    event.shaped("computercraft:disk_drive", ["###", "#C#", "#R#"], {
        "#": "create:andesite_alloy",
        R: "#c:dusts/redstone",
        C: "create_connected:control_chip",
    });

    event.remove("computercraft:wired_modem");
    event.shaped("computercraft:wired_modem", ["###", "#R#", "###"], {
        "#": "create:andesite_alloy",
        R: "create_connected:control_chip",
    });
    event.remove("computercraft:wireless_modem_normal");
    event.shaped("computercraft:wireless_modem_normal", ["#T#", "#R#", "#E#"], {
        "#": "create:andesite_alloy",
        E: "#c:ender_pearls",
        R: "create_connected:control_chip",
        T: "create:transmitter",
    });
    event.remove("computercraft:wireless_modem_advanced");
    event.shaped("computercraft:wireless_modem_advanced", ["#T#", "#R#", "#E#"], {
        "#": "create:brass_ingot",
        E: "minecraft:ender_eye",
        R: "#c:circuits/advanced",
        T: "create:transmitter",
    });

    event.remove("computercraft:pocket_computer_normal");
    event.shaped("computercraft:pocket_computer_normal", ["#A#", "#R#", "#G#"], {
        "#": "create:andesite_alloy",
        A: "minecraft:golden_apple",
        G: "#c:glass_panes",
        R: "create_connected:control_chip",
    });
    event.remove("computercraft:pocket_computer_advanced");
    event.shaped("computercraft:pocket_computer_advanced", ["#A#", "#R#", "#G#"], {
        "#": "create:brass_ingot",
        A: "minecraft:golden_apple",
        G: "#c:glass_panes",
        R: "#c:circuits/advanced",
    });
    event.remove("computercraft:pocket_computer_advanced_upgrade");
    event.shaped("computercraft:pocket_computer_advanced", ["###", "#C#", "#R#"], {
        "#": "create:brass_ingot",
        C: "computercraft:pocket_computer_normal",
        R: "#c:circuits/advanced",
    });

    event.remove("computercraft:turtle_normal");
    event.shaped("computercraft:turtle_normal", ["###", "#C#", "#I#"], {
        "#": "create:andesite_alloy",
        C: "computercraft:computer_normal",
        I: "#c:chests/wooden",
    });
    event.remove("computercraft:turtle_advanced");
    event.shaped("computercraft:turtle_advanced", ["###", "#C#", "#I#"], {
        "#": "create:brass_ingot",
        C: "computercraft:computer_advanced",
        I: "#c:chests/wooden",
    });
    event.remove("computercraft:turtle_advanced_upgrade");
    event.shaped("computercraft:turtle_advanced", ["#B#", "#C#", " R "], {
        "#": "create:brass_ingot",
        B: "create:brass_block",
        C: "computercraft:turtle_normal",
        R: "#c:circuits/advanced",
    });
});
