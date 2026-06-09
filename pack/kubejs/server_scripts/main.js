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

    event.replaceInput(
        { input: "createpropulsion:platinum_sheet" },
        "createpropulsion:platinum_sheet",
        "#c:plates/lead",
    );
    ["nuggets", "ingots", "storage_blocks", "plates"].forEach((type) => {
        event.replaceInput(
            {
                input: `#c:${type}/platinum`,
                not: {
                    id: /.*platinum.*/,
                },
            },
            `#c:${type}/platinum`,
            `#c:${type}/lead`,
        );
    });
    event.remove({ output: "createpropulsion:platinum_fluid_tank" });
    event.remove({ output: "createpropulsion:platinum_casing" });
    event.remove({ output: "createpropulsion:cable" });
    event.remove({ output: "createpropulsion:cable_relay" });

    event.remove({ mod: "ftbfiltersystem" });

    event.recipes.create
        .mixing([Fluid.of("kubejs:molten_redstone", 100)], [Ingredient.of("#c:dusts/redstone")])
        .heated();
    event.recipes.create
        .mixing(
            [Fluid.of("kubejs:molten_redstone", 900)],
            [Ingredient.of("#c:storage_blocks/redstone")],
        )
        .heated();
    event.recipes.create
        .mixing(
            [Fluid.of("kubejs:molten_redstone", 800)],
            [Ingredient.of("#mekanism:enriched/redstone")],
        )
        .heated();

    event.remove({ output: "create:rose_quartz" });
    event.recipes.create.filling("create:rose_quartz", [
        Fluid.of("kubejs:molten_redstone", 400),
        Ingredient.of("#c:dusts/quartz"),
    ]);

    event.remove({ output: "#c:ingots/steel", type: "create:mixing" });

    event.remove({ output: "create:precision_mechanism" });
    const trans_mech = "create:incomplete_precision_mechanism";
    event.recipes.create
        .sequenced_assembly("create:precision_mechanism", "create:brass_sheet", [
            event.recipes.create.deploying("create:incomplete_precision_mechanism", [
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
    const trans_circ = "kubejs:incomplete_basic_control_circuit";
    event.recipes.create
        .sequenced_assembly("mekanism:basic_control_circuit", "mekanism:hdpe_sheet", [
            event.recipes.create.deploying(trans_circ, [trans_circ, "create:copper_nugget"]),
            event.recipes.create.filling(trans_circ, [
                trans_circ,
                Fluid.of("kubejs:molten_redstone", 50),
            ]),
            event.recipes.create.deploying(trans_circ, [trans_circ, "createdeco:andesite_sheet"]),
            event.recipes.create.pressing(trans_circ, trans_circ),
        ])
        .transitionalItem(trans_circ);

    event.remove({ output: "mekanism:advanced_control_circuit" });
    event.recipes.create.deploying("mekanism:advanced_control_circuit", [
        "mekanism:basic_control_circuit",
        "mekanism:alloy_infused",
    ]);
    event.remove({ output: "mekanism:elite_control_circuit" });
    event.recipes.create.deploying("mekanism:elite_control_circuit", [
        "mekanism:advanced_control_circuit",
        "mekanism:alloy_reinforced",
    ]);
    event.remove({ output: "mekanism:ultimate_control_circuit" });
    event.recipes.create.deploying("mekanism:ultimate_control_circuit", [
        "mekanism:elite_control_circuit",
        "mekanism:alloy_atomic",
    ]);

    event.remove({ output: "mekanism:alloy_reinforced" });
    event.recipes.create
        .mixing("2x mekanism:alloy_reinforced", [
            "mekanism:alloy_infused",
            "mekanism:enriched_diamond",
        ])
        .superheated();
    event.remove({ output: "mekanism:alloy_atomic" });
    event.recipes.create
        .mixing("mekanism:alloy_atomic", [
            "mekanism:alloy_reinforced",
            "mekanism:enriched_refined_obsidian",
        ])
        .superheated();

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
    event.remove({ output: "mekanism:quantum_entangloporter" });
    event.remove({ output: "mekanism:quantum_entangloporter" });
});
ServerEvents.tags("item", (event) => {
    event.removeAllTagsFrom("mekanism:bio_fuel");
    event.add("c:plates/lead", "kubejs:lead_sheet");
});

LootJS.lootTables((event) => {
    event.modifyLootTables().replaceItem("farmersdelight:rope", "simulated:rope_coupling");
});
