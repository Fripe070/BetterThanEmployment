ServerEvents.recipes((event) => {
    // Manual recipe for pre-automation andesite crafting
    event.shaped(
        "create:pulp",
        // prettier-ignore
        [
            "PPP",
            "PWP",
            "PPP"
        ],
        {
            P: "#create:pulpifiable",
            W: "minecraft:water_bucket",
        },
    );
    event.shaped("2x kubejs:plant_clay", ["CP", "PC"], {
        P: "create:pulp",
        C: "minecraft:clay_ball",
    });
    event.shaped("2x kubejs:plant_clay", ["PC", "CP"], {
        P: "create:pulp",
        C: "minecraft:clay_ball",
    });
    event.smelting("kubejs:plant_clay_pebbles", "kubejs:plant_clay").xp(0.35);

    event.remove({ output: "create:andesite_alloy", input: /.*_nugget$/ });
    event.shaped("create:andesite_alloy", ["AP", "PA"], {
        P: "kubejs:plant_clay_pebbles",
        A: "minecraft:andesite",
    });
    event.shaped("create:andesite_alloy", ["PA", "AP"], {
        P: "kubejs:plant_clay_pebbles",
        A: "minecraft:andesite",
    });
    event.recipes.create.mixing("create:andesite_alloy", [
        "kubejs:plant_clay_pebbles",
        "minecraft:andesite",
    ]);
});
