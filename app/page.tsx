"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus, Trash2, Smile } from "lucide-react"
import { TacoBackground } from "@/components/taco-background"
import { CustomIcon } from "@/components/custom-icon"

// Custom food icons
const customFoodIcons = [
  { id: "chicken", src: "/icons/chicken.png", name: "Chicken" },
  { id: "cheese", src: "/icons/cheese.png", name: "Cheese" },
  { id: "meat", src: "/icons/meat.png", name: "Meat" },
  { id: "can", src: "/icons/can.png", name: "Canned Corn" },
  { id: "lettuce", src: "/icons/lettuce.png", name: "Lettuce" },
  { id: "corn", src: "/icons/corn.png", name: "Corn" },
  { id: "potato", src: "/icons/potato.png", name: "Potato" },
  { id: "tomato", src: "/icons/tomato.png", name: "Tomato" },
]

// Food icons for ingredients
const foodIcons = [
  { id: "🌮", name: "Taco" },
  { id: "🌯", name: "Burrito" },
  { id: "🧀", name: "Cheese" },
  { id: "🥩", name: "Meat" },
  { id: "🥑", name: "Avocado" },
  { id: "🍅", name: "Tomato" },
  { id: "🌶️", name: "Chili" },
  { id: "🧅", name: "Onion" },
  { id: "🌱", name: "Herb" },
  { id: "🥬", name: "Lettuce" },
  { id: "🍋", name: "Lemon" },
  { id: "🥫", name: "Can" },
  { id: "🍚", name: "Rice" },
  { id: "🫘", name: "Beans" },
  { id: "🥤", name: "Drink" },
]

// Player icons
const playerIcons = [
  { id: "👨‍🍳", name: "Chef" },
  { id: "👩‍🍳", name: "Chef Woman" },
  { id: "🧑‍🍳", name: "Chef Person" },
  { id: "😎", name: "Cool" },
  { id: "🤠", name: "Cowboy" },
  { id: "🦸", name: "Superhero" },
  { id: "🦸‍♀️", name: "Superheroine" },
  { id: "🧙", name: "Wizard" },
  { id: "🧙‍♀️", name: "Witch" },
  { id: "👻", name: "Ghost" },
  { id: "🤖", name: "Robot" },
  { id: "👽", name: "Alien" },
  { id: "🦊", name: "Fox" },
  { id: "🐱", name: "Cat" },
  { id: "🐶", name: "Dog" },
]

// Default taco ingredients
const defaultIngredients = [
  { id: 1, name: "Tortillas", assigned: "", quantity: "12 pack", icon: "🌮", customIcon: "" },
  { id: 2, name: "Ground Beef", assigned: "", quantity: "2 lbs", icon: "🥩", customIcon: "meat" },
  { id: 3, name: "Shredded Cheese", assigned: "", quantity: "1 bag", icon: "🧀", customIcon: "cheese" },
  { id: 4, name: "Lettuce", assigned: "", quantity: "1 head", icon: "🥬", customIcon: "lettuce" },
  { id: 5, name: "Tomatoes", assigned: "", quantity: "4", icon: "🍅", customIcon: "tomato" },
  { id: 6, name: "Sour Cream", assigned: "", quantity: "1 tub", icon: "", customIcon: "" },
  { id: 7, name: "Salsa", assigned: "", quantity: "1 jar", icon: "🌶️", customIcon: "" },
  { id: 8, name: "Guacamole", assigned: "", quantity: "2 avocados", icon: "🥑", customIcon: "" },
  { id: 9, name: "Onions", assigned: "", quantity: "2", icon: "🧅", customIcon: "" },
  { id: 10, name: "Cilantro", assigned: "", quantity: "1 bunch", icon: "🌱", customIcon: "" },
]

// Default players
const defaultPlayers = [
  { id: 1, name: "Hulda", color: "#FF5252", icon: "👨‍🍳" },
  { id: 2, name: "James", color: "#4CAF50", icon: "👩‍🍳" },
  { id: 3, name: "Javan", color: "#2196F3", icon: "🧑‍🍳" },
  { id: 4, name: "Kevin", color: "#FFC107", icon: "😎" },
  { id: 5, name: "Khrys", color: "#9C27B0", icon: "🤠" },
  { id: 6, name: "Sue", color: "#FF9800", icon: "🦸" },
]

export default function Home() {
  const [ingredients, setIngredients] = useState(defaultIngredients)
  const [players, setPlayers] = useState(defaultPlayers)
  const [newIngredient, setNewIngredient] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [openIconDropdown, setOpenIconDropdown] = useState<number | null>(null)
  const [openCustomIconDropdown, setOpenCustomIconDropdown] = useState<number | null>(null)
  const [openPlayerIconDropdown, setOpenPlayerIconDropdown] = useState<number | null>(null)
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null)
  const [editPlayerName, setEditPlayerName] = useState("")

  // Add a new ingredient
  const addIngredient = () => {
    if (newIngredient.trim() === "") return

    setIngredients([
      ...ingredients,
      {
        id: ingredients.length ? Math.max(...ingredients.map((i) => i.id)) + 1 : 1,
        name: newIngredient,
        assigned: "",
        quantity: newQuantity || "1",
        icon: "",
        customIcon: "",
      },
    ])
    setNewIngredient("")
    setNewQuantity("")
  }

  // Remove an ingredient
  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id))
  }

  // Assign an ingredient to a player
  const assignIngredient = (ingredientId: number, playerId: string) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === ingredientId ? { ...ingredient, assigned: playerId } : ingredient,
      ),
    )
    setOpenDropdown(null)
  }

  // Set an emoji icon for an ingredient
  const setIngredientIcon = (ingredientId: number, icon: string) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === ingredientId ? { ...ingredient, icon, customIcon: "" } : ingredient,
      ),
    )
    setOpenIconDropdown(null)
  }

  // Set a custom icon for an ingredient
  const setIngredientCustomIcon = (ingredientId: number, customIcon: string) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === ingredientId ? { ...ingredient, customIcon, icon: "" } : ingredient,
      ),
    )
    setOpenCustomIconDropdown(null)
  }

  // Set an icon for a player
  const setPlayerIcon = (playerId: number, icon: string) => {
    setPlayers(players.map((player) => (player.id === playerId ? { ...player, icon } : player)))
    setOpenPlayerIconDropdown(null)
  }

  // Start editing a player name
  const startEditPlayer = (id: number, name: string) => {
    setEditingPlayer(id)
    setEditPlayerName(name)
  }

  // Save player name edit
  const savePlayerName = (id: number) => {
    if (editPlayerName.trim() === "") return

    setPlayers(players.map((player) => (player.id === id ? { ...player, name: editPlayerName } : player)))
    setEditingPlayer(null)
  }

  // Get player items count
  const getPlayerItemsCount = (playerId: number) => {
    return ingredients.filter((i) => i.assigned === playerId.toString()).length
  }

  // Render ingredient icon
  const renderIngredientIcon = (ingredient: (typeof ingredients)[0]) => {
    if (ingredient.customIcon) {
      const customIcon = customFoodIcons.find((icon) => icon.id === ingredient.customIcon)
      if (customIcon) {
        return <CustomIcon src={customIcon.src} alt={customIcon.name} size={28} />
      }
    }

    if (ingredient.icon) {
      return <span className="text-xl">{ingredient.icon}</span>
    }

    return <Smile className="h-5 w-5 inline-block" />
  }

  return (
    <main className="min-h-screen relative">
      <TacoBackground />

      {/* Header - removed background fill */}
      <header className="relative py-6 px-4 text-center">
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="game-text text-inset-shadow text-4xl md:text-6xl font-bold mb-2">Taco Night Planner</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients Section */}
          <div className="bg-gradient-to-b from-amber-800 to-amber-900 rounded-3xl p-6 border-4 border-yellow-600 shadow-xl">
            <h2 className="game-text text-inset-shadow text-3xl mb-6 text-center font-semibold">Ingredients</h2>
            <div className="mb-6 flex gap-2">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="New ingredient..."
                className="flex-1 p-3 rounded-xl bg-gradient-to-b from-stone-300 to-stone-50 border-yellow-600 border-2 border-yellow-600 text-stone-900 placeholder-stone-900/50 font-semibold"
              />
              <input
                type="text"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                placeholder="Qty & unit"
                className="w-28 p-3 rounded-xl bg-gradient-to-b from-stone-300 to-stone-50 border-yellow-600 border-2 border-yellow-600 text-stone-900 placeholder-stone-900/50 font-semibold"
              />
              <button
                onClick={addIngredient}
                className="game-button bg-green-600 hover:bg-green-500 p-3 rounded-xl border-2 border-green-600 text-green-900"
                style={{
                  background: `radial-gradient(circle at 35% 25%, #00C950, #00C950)`,
                  borderRadius: '12px',
                  boxShadow: `
                    inset 0 -3px 5px rgba(0, 0, 0, 0.3)
                  `
                }}
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="relative bg-gradient-to-b from-amber-100 to-amber-300 rounded-xl p-4 border-2 border-yellow-600 shadow-md group"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {/* Icon button */}
                      <div className="relative">
                        <button
                          onClick={() => {
                            setOpenIconDropdown(openIconDropdown === ingredient.id ? null : ingredient.id)
                            setOpenCustomIconDropdown(null)
                          }}
                          className="game-button badge-icon-button rounded-lg text-center text-xl relative p-3 w-[32px] h-[32px] flex items-center justify-center bg-amber-300"
                          style={{
                            background: `white`,
                            borderRadius: '12px 12px 12px 12px',
                            boxShadow: `
                              0 0 0 2px #8B4513,
                              inset 0 -3px 5px rgba(0, 0, 0, 0.3)
                            `
                          }}
                        >
                          {renderIngredientIcon(ingredient)}
                        </button>

                        {/* Emoji icon dropdown menu */}
                        {openIconDropdown === ingredient.id && (
                          <div className="absolute z-20 mt-2 w-64 left-0 bg-amber-950 rounded-xl border-2 border-yellow-600 shadow-xl">
                            <div className="p-2">
                              <div className="flex justify-between items-center mb-2 border-b border-amber-700 pb-2">
                                <button
                                  onClick={() => {
                                    setOpenIconDropdown(null)
                                    setOpenCustomIconDropdown(ingredient.id)
                                  }}
                                  className="text-sm text-amber-300 hover:text-amber-100"
                                >
                                  Show Custom Icons
                                </button>
                                <button
                                  onClick={() => setIngredientIcon(ingredient.id, "")}
                                  className="p-1 hover:bg-amber-800 rounded-lg text-center"
                                >
                                  ❌
                                </button>
                              </div>
                              <div className="grid grid-cols-5 gap-2">
                                {foodIcons.map((icon) => (
                                  <button
                                    key={icon.id}
                                    onClick={() => setIngredientIcon(ingredient.id, icon.id)}
                                    className="p-2 hover:bg-amber-800 rounded-lg text-center text-2xl"
                                    title={icon.name}
                                  >
                                    {icon.id}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Custom icon dropdown menu */}
                        {openCustomIconDropdown === ingredient.id && (
                          <div className="absolute z-20 mt-2 w-64 left-0 bg-amber-950 rounded-xl border-2 border-yellow-600 shadow-xl">
                            <div className="p-2">
                              <div className="flex justify-between items-center mb-2 border-b border-amber-700 pb-2">
                                <button
                                  onClick={() => {
                                    setOpenCustomIconDropdown(null)
                                    setOpenIconDropdown(ingredient.id)
                                  }}
                                  className="text-sm text-amber-300 hover:text-amber-100"
                                >
                                  Show Emoji Icons
                                </button>
                                <button
                                  onClick={() => setIngredientCustomIcon(ingredient.id, "")}
                                  className="p-1 hover:bg-amber-800 rounded-lg text-center"
                                >
                                  ❌
                                </button>
                              </div>
                              <div className="grid grid-cols-4 gap-2">
                                {customFoodIcons.map((icon) => (
                                  <button
                                    key={icon.id}
                                    onClick={() => setIngredientCustomIcon(ingredient.id, icon.id)}
                                    className="p-2 hover:bg-amber-800 rounded-lg text-center flex items-center justify-center"
                                    title={icon.name}
                                  >
                                    <CustomIcon src={icon.src} alt={icon.name} size={32} />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <span className="game-text font-medium">{ingredient.name}</span>
                      <span className="text-stone-700 font-semibold text-sm">({ingredient.quantity})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Assigned player badge */}
                      {ingredient.assigned && (
                        <div
                          className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                          style={{
                            backgroundColor:
                              players.find((p) => p.id.toString() === ingredient.assigned)?.color || "#888",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          }}
                        >
                          <span>{players.find((p) => p.id.toString() === ingredient.assigned)?.icon}</span>
                          <span>{players.find((p) => p.id.toString() === ingredient.assigned)?.name}</span>
                        </div>
                      )}

                      {/* Dropdown button */}
                      <button
                        onClick={() => setOpenDropdown(openDropdown === ingredient.id ? null : ingredient.id)}
                        className="game-button badge-icon-button text-amber-900 rounded-lg text-center relative p-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{
                          background: `radial-gradient(circle at 35% 25%, #FFC53D, #E6A700)`,
                          borderRadius: '12px',
                          boxShadow: `
                            0 0 0 2px #8B4513,
                            inset 0 -3px 5px rgba(0, 0, 0, 0.3)
                          `
                        }}
                      >
                        {openDropdown === ingredient.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => removeIngredient(ingredient.id)}
                        className="game-button text-white badge-icon-button rounded-lg text-center relative p-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{
                          background: `radial-gradient(circle at 35% 25%, #FF5252, #D32F2F)`,
                          borderRadius: '12px',
                          boxShadow: `
                            0 0 0 2px #a80b0b,
                            inset 0 -3px 5px rgba(0, 0, 0, 0.3)
                          `
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Player dropdown menu */}
                  {openDropdown === ingredient.id && (
                    <div className="absolute z-10 mt-2 w-48 right-0 bg-amber-950 rounded-xl border-2 border-yellow-600 shadow-xl">
                      <div className="py-1">
                        <button
                          onClick={() => assignIngredient(ingredient.id, "")}
                          className="block w-full text-left px-4 py-2 hover:bg-amber-800"
                        >
                          Unassign
                        </button>
                        {players.map((player) => (
                          <button
                            key={player.id}
                            onClick={() => assignIngredient(ingredient.id, player.id.toString())}
                            className="block w-full text-left px-4 py-2 hover:bg-amber-800 flex items-center gap-2"
                          >
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{ backgroundColor: player.color }}
                            ></span>
                            <span>{player.icon}</span>
                            <span>{player.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {ingredients.length === 0 && (
                <div className="text-center py-8 text-amber-300">
                  <p className="game-text">Add some ingredients to get started!</p>
                </div>
              )}
            </div>
          </div>

          {/* Players Section */}
          <div className="bg-gradient-to-b from-amber-800 to-amber-900 rounded-3xl p-6 border-4 border-yellow-600 shadow-xl">
            <h2 className="game-text text-inset-shadow text-3xl mb-6 font-semibold text-center">Players</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="relative rounded-xl p-4 border-2 shadow-lg"
                  style={{
                    borderColor: player.color,
                    background: `linear-gradient(to bottom, ${player.color}33, ${player.color}66)`,
                  }}
                >
                  {editingPlayer === player.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editPlayerName}
                        onChange={(e) => setEditPlayerName(e.target.value)}
                        className="flex-1 p-2 rounded-lg bg-amber-950/50 border-2 border-amber-600"
                        autoFocus
                        onBlur={() => savePlayerName(player.id)}
                        onKeyDown={(e) => e.key === "Enter" && savePlayerName(player.id)}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => startEditPlayer(player.id, player.name)}
                      >
                        {/* Player icon button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenPlayerIconDropdown(openPlayerIconDropdown === player.id ? null : player.id)
                          }}
                          className="game-button badge-icon-button rounded-lg text-center text-xl relative p-3 w-[32px] h-[32px] flex items-center justify-center bg-stone-50"
                          style={{
                            background: `white`,
                            // background: `radial-gradient(circle at 35% 25%, #FFC53D, #E6A700)`,
                            borderRadius: '12px 12px 12px 12px',
                            boxShadow: `
                              0 0 0 2px #8B4513,
                              inset 0 -3px 5px rgba(0, 0, 0, 0.3)
                            `
                          }}
                        >
                          {player.icon || <Smile className="h-5 w-5 inline-block" />}
                        </button>

                        <h3 className="game-text text-xl font-medium">{player.name}</h3>
                      </div>

                      <div className="px-3 py-1 rounded-full text-sm text-amber-300">
                        {getPlayerItemsCount(player.id)} items
                      </div>
                    </div>
                  )}

                  {/* Player icon dropdown */}
                  {openPlayerIconDropdown === player.id && (
                    <div className="absolute z-20 mt-2 w-64 left-0 bg-amber-950 rounded-xl border-2 border-yellow-600 shadow-xl">
                      <div className="p-2 grid grid-cols-5 gap-2">
                        <button
                          onClick={() => setPlayerIcon(player.id, "")}
                          className="p-2 hover:bg-amber-800 rounded-lg text-center"
                        >
                          ❌
                        </button>
                        {playerIcons.map((icon) => (
                          <button
                            key={icon.id}
                            onClick={() => setPlayerIcon(player.id, icon.id)}
                            className="p-2 hover:bg-amber-800 rounded-lg text-center text-2xl"
                            title={icon.name}
                          >
                            {icon.id}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 space-y-1">
                    {ingredients
                      .filter((i) => i.assigned === player.id.toString())
                      .map((i) => (
                        <div
                          key={i.id}
                          className="bg-amber-950/40 rounded-lg px-3 py-2 text-sm flex items-center gap-2"
                        >
                          <div className="flex-shrink-0">{renderIngredientIcon(i)}</div>
                          <span>{i.name}</span>
                          <span className="text-amber-300">({i.quantity})</span>
                        </div>
                      ))}

                    {getPlayerItemsCount(player.id) === 0 && (
                      <div className="text-center py-2 text-amber-300/80 text-sm">Dirty freeloader</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
