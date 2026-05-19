import { amendments } from "@package/net/mehvahdjukaar";

const andesiteRefactor = (event) => {
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
};

ServerEvents.tags("item", (event) => {
    event.remove("neoforge:enchanting_fuels", "#c:gems/lapis");
    event.add("neoforge:enchanting_fuels", "minecraft:amethyst_shard");

    event.add("create:pulpifiable", "minecraft:kelp");
    event.add("create:pulpifiable", "minecraft:seagrass");

    const hideItem = (id) => event.add("c:hidden_from_recipe_viewers", id);
    const unhideItem = (id) => event.remove("c:hidden_from_recipe_viewers", id);

    hideItem(/createcardboardthings:.+/);
    unhideItem("createcardboardthings:cardboard_elytra");
    unhideItem("createcardboardthings:cardboard_ingot");
});

ServerEvents.recipes((event) => {
    andesiteRefactor(event);

    // Stop haivng mulitple types of rope
    event.replaceInput(
        { input: "farmersdelight:rope" },
        "farmersdelight:rope",
        "#c:ropes",
    );
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

    // I think it is OP/unfun
    // But as much as I want to... I will keep it
    // event.remove({ output: "create:mechanical_saw" });

    // Added by aquatic ambitions, but we want to use molten vents.
    event.remove({ input: "minecraft:prismarine", output: "create:veridium" });

    // Worse than the supplementaries counterpart
    event.remove({ output: "createfood:ration_box" });

    // The recipes in this mod are so stupid
    event.remove({
        mod: "createcardboardthings",
        not: { output: "createcardboardthings:cardboard_ingot" },
    });

    event.remove({ output: "create:railway_casing" });
    event.recipes.create.item_application("create:railway_casing", [
        "minecraft:deepslate",
        "create:brass_sheet",
    ]);

    // event.recipes.create.filling("create:rose_quartz", [
    //     Fluid.of("kubejs:molten_redstone", 1000),
    //     "minecraft:quartz",
    // ]);

    // Why?
    event.remove({ input: "minecraft:sugar", output: "#c:powdered_sugar" });
    event.replaceInput(
        { input: "#c:powdered_sugar" },
        "#c:powdered_sugar",
        "minecraft:sugar",
    );

    // Replace lapis with amethyst
    event.remove({
        input: "minecraft:lapis_lazuli",
        output: "minecraft:blue_dye",
    });
    event.remove({ output: "minecraft:lapis_lazuli" });
    event.remove({ output: "minecraft:lapis_block" });
    event.remove({ output: /supplementaries:lapis_bricks.*/ });
    event.remove({
        input: "minecraft:lapis_lazuli",
        output: "minecraft:prismarine_shard",
    });
    event.replaceInput(
        { input: "minecraft:lapis_lazuli" },
        "minecraft:lapis_lazuli",
        "minecraft:amethyst_shard",
    );

    event.remove({ output: "createdieselgenerators:diesel_engine" });
    event.recipes.create.mechanical_crafting(
        "createdieselgenerators:diesel_engine",
        // prettier-ignore
        [
            " bLb ",
            "PPBPP",
            " STS ",
        ],
        {
            b: "create:brass_ingot",
            B: "create:brass_block",
            S: "minecraft:blackstone_slab",
            P: "createdieselgenerators:engine_piston",
            L: "createdieselgenerators:lighter",
            T: "create:fluid_tank",
        },
    );

    event.custom({
        type: "create_dragons_plus:ending",
        ingredients: [{ item: "minecraft:fire_charge" }],
        results: [{ id: "amendments:dragon_charge" }],
    });

    event.remove({
        input: Fluid.of("minecraft:water"),
        output: Fluid.of("aeronautics:levitite_blend"),
    });
    event.recipes.create
        .mixing(Fluid.of("aeronautics:levitite_blend", 500), [
            Fluid.of("create_dragons_plus:dragon_breath", 500),
            Ingredient.of("aeronautics:end_stone_powder", 4),
            Ingredient.of("minecraft:prismarine_crystals", 2),
        ])
        .heated();

    event.recipes.create.mixing("minecraft:sugar", [
        Fluid.of("create:honey", 50),
    ]);

    event.remove({ output: "ftbfiltersystem:smart_filter" });

    event.recipes.create.haunting(
        "minecraft:nether_bricks",
        "minecraft:bricks",
    );

    event.recipes.create.mixing("2x minecraft:dirt", [
        "minecraft:dirt",
        "minecraft:gravel",
    ]);
});

ItemEvents.modifyTooltips((event) => {
    const elytraDisabledText =
        "§l§cNOTE:§r Boosting using rockets is disabled. You are only able to glide";
    event.modify(/.+elytra/, (tooltip) => {
        tooltip.insert(1, Text.of(elytraDisabledText));
    });
});

const disableBoosting = (item) =>
    ItemEvents.rightClicked(item, (event) => {
        if (event.player.isFallFlying()) event.cancel();
    });
disableBoosting("minecraft:firework_rocket");
disableBoosting("createcardboardthings:cardboard_rocket");
