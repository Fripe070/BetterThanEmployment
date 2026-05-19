// Advanced peripherals tweaks

ServerEvents.recipes((event) => {
    event.remove("advancedperipherals:peripheral_casing");
    event.shaped(
        "advancedperipherals:peripheral_casing",
        ["SRS", "BCB", "SIS"],
        {
            S: "create:iron_sheet",
            B: "minecraft:iron_bars",
            C: "create:andesite_casing",
            I: "kubejs:basic_circuit",
            R: "minecraft:redstone_block",
        },
    );
    event.remove("advancedperipherals:environment_detector");
    event.shaped(
        "advancedperipherals:environment_detector",
        ["SDS", "LCL", "WIW"],
        {
            C: "advancedperipherals:peripheral_casing",
            I: "kubejs:basic_circuit",
            D: "minecraft:daylight_detector",
            W: "#minecraft:wool",
            L: "#minecraft:leaves",
            S: "#minecraft:saplings",
        },
    );
    event.remove("advancedperipherals:chat_box");
    event.shaped("advancedperipherals:chat_box", ["SLS", "SCS", "RIR"], {
        C: "advancedperipherals:peripheral_casing",
        I: "kubejs:advanced_circuit",
        S: "#minecraft:hanging_signs",
        L: "minecraft:lectern",
        R: "#c:dusts/redstone",
    });
    event.remove("advancedperipherals:player_detector");
    event.shaped("advancedperipherals:player_detector", ["TST", "ECE", "RIR"], {
        C: "advancedperipherals:peripheral_casing",
        I: "kubejs:advanced_circuit",
        S: "minecraft:sculk_sensor",
        T: "minecraft:tripwire_hook",
        R: "minecraft:redstone_block",
        E: "minecraft:ender_eye",
    });
    event.remove("advancedperipherals:energy_detector");
    event.shaped("advancedperipherals:energy_detector", ["RTR", "KCK", "BIB"], {
        C: "advancedperipherals:peripheral_casing",
        I: "kubejs:basic_circuit",
        R: "#c:dusts/redstone",
        B: "minecraft:redstone_block",
        T: "minecraft:redstone_torch",
        K: "minecraft:comparator",
    });
    event.remove("advancedperipherals:inventory_manager");
    event.shaped(
        "advancedperipherals:inventory_manager",
        ["KPK", "ECE", "RIR"],
        {
            C: "advancedperipherals:peripheral_casing",
            I: "kubejs:advanced_circuit",
            R: "#c:dusts/redstone",
            K: "#c:chests",
            E: "minecraft:ender_chest",
            P: "minecraft:ender_pearl",
        },
    );
    event.remove("advancedperipherals:block_reader");
    event.shaped("advancedperipherals:block_reader", ["SMS", "OCO", "RIR"], {
        C: "advancedperipherals:peripheral_casing",
        I: "kubejs:basic_circuit",
        R: "#c:dusts/redstone",
        O: "minecraft:observer",
        M: "#computercraft:wired_modem",
        S: "create:iron_sheet",
    });
    event.remove("advancedperipherals:block_reader");
    event.shaped("advancedperipherals:block_reader", ["SMS", "OCO", "RIR"], {
        C: "advancedperipherals:peripheral_casing",
        I: "kubejs:basic_circuit",
        R: "#c:dusts/redstone",
        O: "minecraft:observer",
        M: "#computercraft:wired_modem",
        S: "create:iron_sheet",
    });
    event.remove("advancedperipherals:nbt_storage");
    event.shaped("advancedperipherals:nbt_storage", ["SKS", "KCK", "RIR"], {
        C: "advancedperipherals:peripheral_casing",
        I: "kubejs:basic_circuit",
        R: "#c:dusts/redstone",
        K: "#c:chests",
        S: "create:iron_sheet",
    });
    event.remove("advancedperipherals:geo_scanner");
    event.shaped("advancedperipherals:geo_scanner", ["DMD", "ECE", "RIR"], {
        C: "advancedperipherals:peripheral_casing",
        I: "kubejs:advanced_circuit",
        R: "minecraft:redstone_block",
        E: "minecraft:ender_eye",
        M: "#computercraft:wired_modem",
        D: "minecraft:diamond",
    });
    event.remove("advancedperipherals:chunk_controller");
    event.shaped(
        "advancedperipherals:chunk_controller",
        ["RSR", "SLS", "RSR"],
        {
            L: "create_power_loader:andesite_chunk_loader",
            S: "create:iron_sheet",
            R: "#c:dusts/redstone",
        },
    );
});
