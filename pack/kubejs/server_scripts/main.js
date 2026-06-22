ServerEvents.recipes((event) => {
    // Stop haivng mulitple types of rope
    event.replaceInput({ input: "farmersdelight:rope" }, "farmersdelight:rope", "#c:ropes");
    event.replaceOutput(
        { output: "farmersdelight:rope" },
        "farmersdelight:rope",
        "simulated:rope_coupling",
    );
    // More balanced with aeronautics costs
    event.remove({
        input: "farmersdelight:straw",
        output: "simulated:rope_coupling",
    });
    event.shapeless("1x simulated:rope_coupling", "4x farmersdelight:straw");

    // Unify bio fuel (prefer crafts and additions)
    event.remove({ type: "mekanism:crushing", output: "mekanism:bio_fuel" });
    event.replaceOutput(
        { output: "mekanism:bio_fuel" },
        "mekanism:bio_fuel",
        "createaddition:biomass",
    );
    event.replaceInput(
        { input: "mekanism:bio_fuel" },
        "mekanism:bio_fuel",
        "createaddition:biomass",
    );
    event.remove({ output: "mekanism:block_bio_fuel" });
    event.replaceInput(
        { input: "mekanism:block_bio_fuel" },
        "mekanism:block_bio_fuel",
        "createaddition:biomass_pellet_block",
    );

    event.remove({ type: "create:mixing", output: "createaddition:biomass" });
    event.recipes.create
        .mixing("createaddition:biomass", [
            Ingredient.of("#create:pulpifiable", 12),
            Fluid.of("createaddition:seed_oil", 100),
        ])
        .heated();
    event.recipes.create
        .mixing("createaddition:biomass", [
            Ingredient.of("#minecraft:saplings", 9),
            Fluid.of("createaddition:seed_oil", 100),
        ])
        .heated();
    event.recipes.create
        .mixing("createaddition:biomass", [
            Ingredient.of("#minecraft:leaves", 12),
            Fluid.of("createaddition:seed_oil", 100),
        ])
        .heated();
    event.recipes.create
        .mixing("createaddition:biomass", [
            Ingredient.of("#minecraft:flowers", 9),
            Fluid.of("createaddition:seed_oil", 100),
        ])
        .heated();
    event.recipes.create
        .mixing("createaddition:biomass", [
            Ingredient.of("minecraft:honeycomb", 4),
            Fluid.of("createaddition:seed_oil", 100),
        ])
        .heated();
    event.recipes.create
        .mixing("createaddition:biomass", [
            Ingredient.of("#c:crops", 6),
            Fluid.of("createaddition:seed_oil", 100),
        ])
        .heated();
    event.recipes.create
        .mixing("createaddition:biomass", [
            Ingredient.of("#createaddition:plant_foods", 6),
            Fluid.of("createaddition:seed_oil", 100),
        ])
        .heated();

    // same as seed oil
    event.remove({ output: Fluid.of("createdieselgenerators:plant_oil") });

    // Hacky jetpack removal
    event.remove({ output: /.*jetpack.*/ });

    event.forEachRecipe({ type: "cataclysm:weapon_fusion" }, (recipe) => {
        const jsonRecipe = JSON.parse(recipe.json.toString());
        const transitional = jsonRecipe.base.item;
        event.recipes.create
            .sequenced_assembly(jsonRecipe.result.id, jsonRecipe.base.item, [
                event.recipes.create.deploying(transitional, [
                    transitional,
                    jsonRecipe.addition.item,
                ]),
                event.recipes.create.pressing(transitional, transitional),
            ])
            .transitionalItem(transitional);
        event.remove({
            type: "cataclysm:weapon_fusion",
            output: jsonRecipe.result.id,
            mod: "cataclysm",
        });
    });
    event.remove({ output: "cataclysm:mechanical_fusion_anvil" });

    event.remove({ output: "mekanism:cardboard_box" });

    event.remove({ mod: "ftbfiltersystem" });

    event.remove({ output: "create:rose_quartz" });
    event.recipes.create.filling("create:rose_quartz", [
        Fluid.of("productivemetalworks:molten_redstone", 400),
        Ingredient.of("#c:dusts/quartz"),
    ]);

    event.remove({ output: "#c:ingots/steel", type: "create:mixing" });

    event.remove({ output: "create:precision_mechanism" });
    const trans_mech = "create:incomplete_precision_mechanism";
    event.recipes.create
        .sequenced_assembly("create:precision_mechanism", "#c:plates/brass", [
            event.recipes.create.deploying(trans_mech, [
                "create:incomplete_precision_mechanism",
                "create:electron_tube",
            ]),
            event.recipes.create.deploying(trans_mech, [trans_mech, "create:cogwheel"]),
            event.recipes.create.deploying(trans_mech, [trans_mech, "create:large_cogwheel"]),
            event.recipes.create.pressing(trans_mech, trans_mech),
        ])
        .transitionalItem(trans_mech);
    event.replaceInput(
        { output: "create:controls" },
        "create:precision_mechanism",
        "create:electron_tube",
    );

    event.remove({ output: "mekanism:basic_control_circuit" });
    const trans_bas_circ = "kubejs:incomplete_basic_control_circuit";
    event.recipes.create
        .sequenced_assembly("mekanism:basic_control_circuit", "create:golden_sheet", [
            event.recipes.create.deploying(trans_bas_circ, [
                trans_bas_circ,
                "create:copper_nugget",
            ]),
            event.recipes.create.filling(trans_bas_circ, [
                trans_bas_circ,
                Fluid.of("productivemetalworks:molten_redstone", 50),
            ]),
            event.recipes.create.deploying(trans_bas_circ, [
                trans_bas_circ,
                "createdeco:andesite_sheet",
            ]),
            event.recipes.create.pressing(trans_bas_circ, trans_bas_circ),
        ])
        .transitionalItem(trans_bas_circ);

    event.remove({ output: "mekanism:advanced_control_circuit" });
    const trans_adv_circ = "kubejs:incomplete_advanced_control_circuit";
    event.recipes.create
        .sequenced_assembly("mekanism:advanced_control_circuit", "mekanism:alloy_infused", [
            event.recipes.create.deploying(trans_adv_circ, [
                trans_adv_circ,
                "mekanism:basic_control_circuit",
            ]),
            event.recipes.create.filling(trans_adv_circ, [
                trans_adv_circ,
                Fluid.of("productivemetalworks:molten_redstone", 100),
            ]),
            event.recipes.create.deploying(trans_adv_circ, [trans_adv_circ, "mekanism:hdpe_sheet"]),
            event.recipes.create.pressing(trans_adv_circ, trans_adv_circ),
        ])
        .transitionalItem(trans_adv_circ);

    event.remove({ output: "mekanism:alloy_reinforced" });
    event.recipes.create
        .mixing("2x mekanism:alloy_reinforced", [
            "2x mekanism:alloy_infused",
            "mekanism:enriched_diamond",
            Fluid.of("create_enchantment_industry:experience", 100),
        ])
        .superheated();
    event.remove({ output: "mekanism:elite_control_circuit" });
    const trans_eli_circ = "kubejs:incomplete_elite_control_circuit";
    event.recipes.create
        .sequenced_assembly("mekanism:elite_control_circuit", "mekanism:alloy_reinforced", [
            event.recipes.create.deploying(trans_eli_circ, [
                trans_eli_circ,
                "mekanism:advanced_control_circuit",
            ]),
            event.recipes.create.filling(trans_eli_circ, [
                trans_eli_circ,
                Fluid.of("productivemetalworks:molten_redstone", 150),
            ]),
            event.recipes.create.deploying(trans_eli_circ, [trans_eli_circ, "mekanism:hdpe_sheet"]),
            event.recipes.create.pressing(trans_eli_circ, trans_eli_circ),
        ])
        .transitionalItem(trans_eli_circ);

    event.remove({ output: "mekanism:alloy_atomic" });
    event.recipes.create
        .mixing("mekanism:alloy_atomic", [
            Ingredient.of("mekanism:alloy_reinforced"),
            Ingredient.of("mekanism:enriched_refined_obsidian"),
            Fluid.of("createdieselgenerators:crude_oil", 1000),
        ])
        .superheated();
    event.remove({ output: "mekanism:ultimate_control_circuit" });
    const trans_ult_circ = "kubejs:incomplete_ultimate_control_circuit";
    event.recipes.create
        .sequenced_assembly("mekanism:ultimate_control_circuit", "mekanism:alloy_atomic", [
            event.recipes.create.deploying(trans_ult_circ, [
                trans_ult_circ,
                "mekanism:elite_control_circuit",
            ]),
            event.recipes.create.filling(trans_ult_circ, [
                trans_ult_circ,
                Fluid.of("productivemetalworks:molten_redstone", 200),
            ]),
            event.recipes.create.deploying(trans_ult_circ, [trans_ult_circ, "mekanism:hdpe_sheet"]),
            event.recipes.create.pressing(trans_ult_circ, trans_ult_circ),
        ])
        .transitionalItem(trans_ult_circ);

    event.remove({ output: "mekanism:metallurgic_infuser" });
    event.shaped("mekanism:metallurgic_infuser", ["IFI", "RPR", "IFI"], {
        P: "mekanism:basic_control_circuit",
        I: "create:iron_sheet",
        F: "minecraft:furnace",
        R: "minecraft:redstone",
    });
    event.remove({ output: "mekanism:electrolytic_core" });
    event.shaped("mekanism:electrolytic_core", ["AOA", "IPG", "AOA"], {
        A: "mekanism:alloy_infused",
        O: "#c:dusts/osmium",
        I: "#c:dusts/iron",
        G: "#c:dusts/gold",
        P: "create:precision_mechanism",
    });

    event.remove({ output: "mekanism:configurator" });
    event.shaped("mekanism:configurator", [" IO", " CI", "S  "], {
        I: "#c:plates/iron",
        O: "#c:ingots/osmium",
        C: "#c:rods/copper",
        S: "#c:ingots/steel",
    });

    event.remove({ output: "createaddition:modular_accumulator" });
    event.shaped("createaddition:modular_accumulator", [" R ", "EBE", " W "], {
        E: "mekanism:energy_tablet",
        B: "create:brass_casing",
        R: "#c:rods/copper",
        W: "#c:wires/electrum",
    });

    event.remove({ output: "mekanism:teleporter" });
    event.remove({ output: "mekanism:portable_teleporter" });
    event.remove({ output: "mekanism:quantum_entangloporter" });
    event.remove({ output: "mekanism:quantum_entangloporter" });
    event.remove({ output: /^mekanism:qio.+/ });
    event.remove({ output: "mekanism:portable_qio_dashboard" });

    event.remove({ output: Fluid.of("createaddition:bioethanol") });

    event.remove({ output: "ae2:quantum_link" });
    event.remove({ output: "ae2:quantum_ring" });
    event.remove({ output: "ae2:quantum_entangled_singularity" });

    event.remove({ output: "minecraft:ender_eye" });
    event.shapeless("minecraft:ender_eye", ["botania:mana_pearl", "minecraft:blaze_powder"]);

    event.remove({ output: "createdeco:zinc_sheet" }); // prefer crafts and additions zinc sheet

    event.recipes.create.filling("minecraft:redstone", [
        Fluid.of("createdieselgenerators:gasoline", 25),
        Ingredient.of("create:cinder_flour"),
    ]);

    event.remove({ output: "aeinfinitybooster:infinity_card" });
    event.shaped("aeinfinitybooster:infinity_card", ["PIP", "GWG", "UEU"], {
        W: "ae2:wireless_booster",
        U: "sgearmetalworks:uru_metal_ingot",
        G: "botania:gaia_ingot",
        P: "mekanism:pellet_polonium",
        I: "cataclysm:ignitium_ingot",
        E: "minecraft:ender_chest",
    });

    event.remove({ output: "aeinfinitybooster:dimension_card" });

    const trans_dim_card = "kubejs:incomplete_dimension_card";
    event.recipes.create
        .sequenced_assembly(
            "aeinfinitybooster:dimension_card",
            "mekanism:ultimate_control_circuit",
            [
                event.recipes.create.filling(trans_dim_card, [
                    trans_dim_card,
                    Fluid.of("kubejs:concentrated_chroma", 2000),
                ]),
                event.recipes.create.deploying(trans_dim_card, [
                    trans_dim_card,
                    "minecraft:nether_star",
                ]),
                event.recipes.create.deploying(trans_dim_card, [
                    trans_dim_card,
                    "aeinfinitybooster:infinity_card",
                ]),
                event.recipes.create.pressing(trans_dim_card, trans_dim_card),
            ],
        )
        .loops(4)
        .transitionalItem(trans_dim_card);

    event.replaceInput(
        { output: "ae2:wireless_receiver" },
        "ae2:quartz_fiber",
        "mekanism:teleportation_core",
    );

    // Remove all movement units I do not want
    event.remove({ output: "mekanism:module_teleportation_unit" });
    event.remove({ output: "mekanism:module_jetpack_unit" });
    event.remove({ output: "mekanism:module_gravitational_modulating_unit" });

    event.replaceInput(
        { output: "mekanism:personal_chest" },
        "#c:glass_blocks/cheap",
        "minecraft:shulker_shell",
    );
    event.replaceInput(
        { output: "mekanism:personal_barrel" },
        "#c:glass_blocks/cheap",
        "minecraft:shulker_shell",
    );

    event.replaceInput(
        { output: "createdieselgenerators:huge_diesel_engine" },
        "create:brass_block",
        "createdieselgenerators:large_diesel_engine",
    );

    event.replaceInput(
        { output: "mechtrowel:wand_capacity_template" },
        "minecraft:netherite_ingot",
        "botania:astrolabe",
    );

    event.remove({ mod: "silentgear", output: /.*flax.*/ });
    event.shapeless("silentgear:flax_string", "2x supplementaries:flax");

    event.shaped("createhorsepower:horse_crank", ["C", "G"], {
        C: "create:hand_crank",
        G: "create:millstone",
    });
});

ServerEvents.tags("item", (event) => {
    event.removeAllTagsFrom("mekanism:bio_fuel");
    event.add("c:plates/lead", "kubejs:lead_sheet");
});

LootJS.lootTables((event) => {
    event.modifyLootTables().replaceItem("farmersdelight:rope", "simulated:rope_coupling");
    event.modifyLootTables().replaceItem("minecraft:ender_eye", "minecraft:ender_pearl");
});

ServerEvents.tags("block", (event) => {
    // Use spatial storage instead!
    event.add("create:non_movable", ["ae2:flawless_budding_quartz"]);
});

ItemEvents.modifyTooltips((event) => {
    event.modify(/.+elytra.*/, (tooltip) => {
        tooltip.insert(
            1,
            Text.of("§l§cNOTE:§r Boosting while flying is disabled. You are only able to glide"),
        );
        tooltip.insert(2, Text.of("§7Exploits that bypass this will be fixed"));
    });
});
ItemEvents.rightClicked((event) => {
    if (event.player.isFallFlying()) event.cancel();
});
