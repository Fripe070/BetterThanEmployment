ServerEvents.recipes((event) => {
    event.remove({ output: "silentgear:stone_anvil" });
    event.remove({ type: "silentgear:tool_action" });
    event.recipes.create.milling("silentgear:crushed_shulker_shell", "minecraft:shulker_shell");
    event.recipes.create.cutting(
        [CreateItem.of("silentgear:pebble", 1), CreateItem.of("silentgear:pebble", 1 / 2)],
        "minecraft:gravel",
    );
    event.custom({
        type: "farmersdelight:cutting",
        ingredients: [{ tag: "minecraft:logs" }],
        result: [{ item: { count: 6, id: "silentgear:template_board" } }],
        tool: [
            { type: "farmersdelight:item_ability", action: "knife_dig" },
            { tag: "c:tools/knife" },
        ],
    });

    event.remove({ output: "silentgear:alloy_forge" });
    event.remove({ type: "silentgear:alloy_making/metal" });

    // Use the foundry
    event.remove({
        type: "minecraft:crafting_shapeless",
        input: "minecraft:blaze_powder",
        output: "silentgear:blaze_gold_ingot",
    });
    event.remove({
        type: "minecraft:crafting_shaped",
        input: "minecraft:magma_cream",
        output: "silentgear:crimson_steel_ingot",
    });
    event.remove({
        type: "minecraft:crafting_shaped",
        input: "#c:ender_pearls",
        output: "silentgear:azure_electrum_ingot",
    });
    event.recipes.create.filling(
        'silentgear:custom_ingot[silentgear:material={material:"silentgear:high_carbon_steel"}]',
        [Ingredient.of("#c:ingots/steel"), Fluid.of("productivemetalworks:molten_carbon", 100)],
    );
});
