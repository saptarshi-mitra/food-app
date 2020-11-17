export interface RecipeSuggest{
    results: SuggestedResults[]
}

interface SuggestedResults{
    title: string,
    id: number
}