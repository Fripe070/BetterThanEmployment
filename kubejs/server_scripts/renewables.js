ServerEvents.recipes((event) => {
    // Allow making deepslate renewably, in case that's desired
    event.recipes.create.compacting("minecraft:deepslate", [
        "4x minecraft:cobblestone",
        Fluid.of("minecraft:lava", 100),
    ]);

    // Allow making ash without burning stuff in the world
    event.smoking("2x supplementaries:ash", "#minecraft:logs_that_burn");

    // Renewable tuff. It is a great building block.
    event.recipes.create.mixing("minecraft:tuff", [
        "minecraft:andesite",
        "supplementaries:ash",
    ]);
    // Remove tuff to ore crushing recipe so that making it easily renewable is not OP
    event.remove({ type: "create:crushing", input: "minecraft:tuff" });

    // Allow creating gilded blackstone
    event.recipes.create.mixing("minecraft:gilded_blackstone", [
        "minecraft:blackstone",
        "minecraft:gold_ingot",
    ]);
    // Nerf the crushing recipe for it, as it by default gives 18 gold nuggets
    event.remove({
        type: "create:crushing",
        output: "minecraft:gold_nugget",
        input: "minecraft:gilded_blackstone",
    });
    event.recipes.create.crushing(
        ["8x minecraft:gold_nugget", "minecraft:blackstone"],
        "minecraft:gilded_blackstone",
    );

    // Use stone instead of cobblestone
    event.remove({
        mod: "create_dragons_plus",
        input: "minecraft:cobblestone",
        output: "minecraft:end_stone",
    });
    event.custom({
        type: "create_dragons_plus:ending",
        ingredients: [{ item: "minecraft:stone" }],
        results: [{ id: "minecraft:end_stone" }],
    });
    // Since bulk ending recipes exist, this is self-perpetuating
    event.custom({
        type: "create_dragons_plus:ending",
        ingredients: [{ item: "minecraft:glass_bottle" }],
        results: [{ id: "minecraft:dragon_breath" }],
    });
    // Above are used primarily for levitite

    // Renewable netherrack
    event.recipes.create.filling("minecraft:netherrack", [
        Fluid.sizedIngredientOf(
            Fluid.ingredientOf("create:potion", {
                "create:potion_fluid_bottle_type": "regular",
                "minecraft:potion_contents": {
                    potion: "minecraft:healing",
                },
            }),
            50,
        ),
        "minecraft:cobblestone",
    ]);
});
