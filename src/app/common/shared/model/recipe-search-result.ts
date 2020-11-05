export interface RecipeSearchResult{
    results: IndividualSearchRecipe[],
    offset: number,
    number: number,
    totalResults: number
}


export interface IndividualSearchRecipe{
    vegetarian: boolean,
    vegan: boolean,
    glutenFree: boolean,
    dairyFree: boolean,
    veryHealthy: boolean,
    cheap: boolean,
    veryPopular: boolean,
    sustainable: boolean,
    weightWatcherSmartPoints: number,
    gaps: string,
    lowFodmap: boolean,
    aggregateLikes: number,
    spoonacularScore: number,
    healthScore: number,
    creditsText: string,
    license: string,
    sourceName: string,
    pricePerServing: number,
    id: number,
    title: string,
    readyInMinutes: number,
    servings: number,
    sourceUrl: string,
    image: string,
    imageType: string,
    nutrition: Nutrition,
    summary: string,
    cuisines: string[],
    dishTypes: string[],
    diets: string[],
    occasions: string[],
    analyzedInstructions: [],
    spoonacularSourceUrl: string
}

export interface Nutrition{
    nutrients: Nutrients[],
    properties: Properties[],
    flavanoids: Flavanoids[],
    ingredients: Ingredients[],
    caloricBreakdown: {
        percentProtein: number,
        percentFat: number,
        percentCarbs: number,
    },
    weightPerServing: {
        amount: number,
        unit: string
    }
}

export interface Nutrients{
    title: string,
    amount: number,
    unit: string,
    percentOfDailyNeeds: number
}

export interface Properties{
    title: string,
    amount: number,
    unit: any
}

export interface Flavanoids{
    title: string,
    amount: number,
    unit: any
}

export interface Ingredients{
    name: string,
    amount: number,
    unit: string,
    nutrients: NutrientsOfIngredients[]
}

export interface NutrientsOfIngredients{
    name: string,
    amount: number,
    unit: string
}
