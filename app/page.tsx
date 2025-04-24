"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Plus, Trash2, Smile } from "lucide-react"
import { TacoBackground } from "@/components/taco-background"
import { LuCopy, LuShare2, LuCheck, LuPlus, LuTrash2, LuUser, LuSave, LuX } from 'react-icons/lu';
import { FaTrashAlt } from 'react-icons/fa';

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
  { id: "🥤", name: "Beverages" },
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
  { id: 1, name: "Tortillas", assigned: "", quantity: "12 pack", icon: "🌮"},
  { id: 2, name: "Ground Beef", assigned: "", quantity: "2 lbs", icon: "🥩"},
  { id: 3, name: "Shredded Cheese", assigned: "", quantity: "1 bag", icon: "🧀"},
  { id: 4, name: "Lettuce", assigned: "", quantity: "1 head", icon: "🥬"},
  { id: 5, name: "Tomatoes", assigned: "", quantity: "4", icon: "🍅"},
  { id: 6, name: "Sour Cream", assigned: "", quantity: "1 tub", icon: ""},
  { id: 7, name: "Salsa", assigned: "", quantity: "1 jar", icon: "🌶️"},
  { id: 8, name: "Guacamole", assigned: "", quantity: "2 avocados", icon: "🥑"},
  { id: 9, name: "Onions", assigned: "", quantity: "2", icon: "🧅"},
  { id: 10, name: "Cilantro", assigned: "", quantity: "1 bunch", icon: "🌱"},
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

// SIMPLIFIED: Encode state to URL-safe base64
function encodeStateToBase64(state: any): string {
  try {
    // Create compact representation of the state
    const minimalState = {
      i: state.ingredients.map((ing: any) => ({
        i: ing.id,
        n: ing.name,
        ...(ing.assigned ? { a: ing.assigned } : {}),
        ...(ing.quantity ? { q: ing.quantity } : {}),
        ...(ing.icon ? { e: ing.icon } : {})
      })),
      p: state.players.map((p: any) => ({
        i: p.id,
        n: p.name,
        ...(p.color ? { c: p.color } : {}),
        ...(p.icon ? { e: p.icon } : {})
      }))
    };
    
    // Stringify and encode
    const jsonString = JSON.stringify(minimalState);
    
    // Correctly handle UTF-8 characters before base64 encoding
    const utf8SafeString = unescape(encodeURIComponent(jsonString));
    
    // Use standard browser base64 encoding
    const base64String = btoa(utf8SafeString);
    
    // Make the base64 string URL-safe
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    
  } catch (error) {
    console.error('Error encoding state:', error);
    return '';
  }
}

// SIMPLIFIED: Decode base64 state from URL
function decodeBase64ToState(encodedState: string): any {
  try {
    // Make the string base64-compatible again (add padding, replace URL-safe chars)
    let base64String = encodedState.replace(/-/g, '+').replace(/_/g, '/');
    while (base64String.length % 4) {
      base64String += '=';
    }

    // Use standard browser base64 decoding
    const utf8SafeString = atob(base64String);
    
    // Correctly handle UTF-8 characters after base64 decoding
    const jsonString = decodeURIComponent(escape(utf8SafeString));
    
    // Parse JSON data
    const parsedData = JSON.parse(jsonString);
    
    // Ensure expected structure or use defaults
    return {
      ingredients: Array.isArray(parsedData.i) ? parsedData.i.map((item: any) => ({
        id: item.i || 0,
        name: item.n || '',
        assigned: item.a || '',
        quantity: item.q || '',
        icon: item.e || ''
      })) : [],
      players: Array.isArray(parsedData.p) ? parsedData.p.map((item: any) => ({
        id: item.i || 0,
        name: item.n || '',
        color: item.c || '#FF5252',
        icon: item.e || ''
      })) : []
    };
  } catch (error) {
    console.error('Error decoding state:', error);
    return { ingredients: [], players: [] };
  }
}

export default function Home() {
  // Start with default values for SSR
  const [ingredients, setIngredients] = useState<typeof defaultIngredients>(defaultIngredients)
  const [players, setPlayers] = useState<typeof defaultPlayers>(defaultPlayers)
  
  // Load local storage data after component mounts on client
  useEffect(() => {
    try {
      // First try to load from URL (shared link has priority)
      const urlParams = new URLSearchParams(window.location.search);
      const encodedData = urlParams.get('data');
      
      if (encodedData) {
        const decodedData = decodeBase64ToState(encodedData);
        if (decodedData.ingredients.length > 0) {
          setIngredients(decodedData.ingredients);
        }
        if (decodedData.players.length > 0) {
          setPlayers(decodedData.players);
        }
        
        // Show success notification for loaded data
        showNotification('Successfully loaded shared taco night plan!', 'success');
        return; // Skip loading from localStorage if URL data was used
      }
      
      // If no URL data, try localStorage
      const savedIngredients = localStorage.getItem('taco-night-ingredients')
      if (savedIngredients) {
        setIngredients(JSON.parse(savedIngredients))
      }
      
      const savedPlayers = localStorage.getItem('taco-night-players')
      if (savedPlayers) {
        setPlayers(JSON.parse(savedPlayers))
      }
    } catch (error) {
      console.error('Error loading saved data:', error)
      showNotification('There was an error loading saved data.', 'error');
    }
  }, [])
  
  const [newIngredient, setNewIngredient] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [openIconDropdown, setOpenIconDropdown] = useState<number | null>(null)
  const [openPlayerIconDropdown, setOpenPlayerIconDropdown] = useState<number | null>(null)
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null)
  const [editPlayerName, setEditPlayerName] = useState("")
  
  // Notification system
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null)
  
  // Show notification
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type })
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  
  // Save data to localStorage whenever ingredients or players change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('taco-night-ingredients', JSON.stringify(ingredients))
    }
  }, [ingredients])
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('taco-night-players', JSON.stringify(players))
    }
  }, [players])
  
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
        ingredient.id === ingredientId ? { ...ingredient, icon } : ingredient,
      ),
    )
    setOpenIconDropdown(null)
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
    if (ingredient.icon) {
      return <span className="text-xl">{ingredient.icon}</span>
    }
    return <Smile className="h-5 w-5 inline-block" />
  }

  // Reset all data to defaults
  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all data? This will clear all your changes.")) {
      setIngredients(defaultIngredients)
      setPlayers(defaultPlayers)
      localStorage.removeItem('taco-night-ingredients')
      localStorage.removeItem('taco-night-players')
    }
  }
  
  // Generate a sharable URL with current data
  const shareCurrentSetup = async () => {
    try {
      showNotification('Generating sharable link...', 'info');
      
      // Encode the current state
      const encodedData = encodeStateToBase64({
        ingredients,
        players
      });
      
      if (!encodedData) {
        throw new Error("Failed to encode data");
      }
      
      // Create the sharable URL
      const shareableUrl = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
      
      // Use modern Clipboard API if available
      let copied = false;
      
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareableUrl);
          copied = true;
        } else {
          // Fallback to the older approach
          const tempInput = document.createElement('input');
          tempInput.value = shareableUrl;
          tempInput.setAttribute('readonly', '');
          tempInput.style.position = 'absolute';
          tempInput.style.left = '-9999px';
          document.body.appendChild(tempInput);
          
          // Check if mobile device
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          if (isMobile) {
            // Select for mobile
            tempInput.focus();
            tempInput.setSelectionRange(0, shareableUrl.length);
          } else {
            tempInput.select();
          }
          
          copied = document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        copied = false;
      }
      
      // Show appropriate notification
      if (copied) {
        showNotification('Sharable link copied to clipboard! Share it with your friends.', 'success');
      } else {
        // Create a text area with the URL that users can copy manually
        const textArea = document.createElement('textarea');
        textArea.value = shareableUrl;
        textArea.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-2 rounded border w-4/5 max-w-md';
        textArea.rows = 3;
        document.body.appendChild(textArea);
        
        showNotification('Copy this link manually (select all + copy):', 'info');
        
        // Remove the text area after 15 seconds
        setTimeout(() => {
          if (document.body.contains(textArea)) {
            document.body.removeChild(textArea);
          }
        }, 15000);
      }
      
      // Save in console for debugging
      console.log('Sharable URL:', shareableUrl);
      
    } catch (error) {
      console.error('Error generating sharable link:', error);
      showNotification('Failed to generate sharable link. Try again with fewer items.', 'error');
    }
  }

  // Close dropdowns when clicking outside any dropdown-wrapper
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest('.dropdown-wrapper')) {
        setOpenIconDropdown(null);
        setOpenDropdown(null);
        setOpenPlayerIconDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main className="min-h-screen relative">
      <TacoBackground />

      {/* Notification component */}
      {notification && (
        <div 
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg max-w-md text-center transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 
            notification.type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
          }`}
        >
          <div className="flex items-center">
            <span>{notification.message}</span>
            <button 
              onClick={() => setNotification(null)} 
              className="ml-3 opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Header - removed background fill */}
      <header className="relative py-6 px-4 text-center">
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="game-text text-inset-shadow text-4xl md:text-6xl font-bold mb-2">Taco Night Planner</h1>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={resetToDefaults}
              className="mt-2 px-3 py-1 text-sm rounded-lg text-amber-900 bg-amber-200 hover:bg-amber-300 transition-colors"
            >
              Reset to Defaults
            </button>
            <button 
              onClick={shareCurrentSetup}
              className="mt-2 px-3 py-1 text-sm rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Share This Setup
            </button>
          </div>
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

            <div className="space-y-3 max-h-[60vh] overflow-visible pr-2 custom-scrollbar">
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
                          <div className="absolute z-50 mt-2 w-64 left-0 bg-amber-950 rounded-xl border-2 border-yellow-600 shadow-xl">
                            <div className="p-2">
                              <div className="flex justify-between items-center mb-2 border-b border-amber-700 pb-2">
                                <button
                                  onClick={() => setOpenIconDropdown(null)}
                                  className="text-sm text-amber-300 hover:text-amber-100"
                                >
                                  Close
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
                      </div>

                      <span className="game-text font-medium">{ingredient.name}</span>
                      <span className="text-stone-700 font-semibold text-sm">({ingredient.quantity})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Assigned player badge */}
                      {ingredient.assigned && (
                        <div
                          className="px-3 py-1 rounded-full text-sm flex items-center gap-1 text-white"
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
                    <div className="absolute z-50 mt-2 w-48 right-0 bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl border-2 border-yellow-600 shadow-xl">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-visible pr-2 custom-scrollbar">
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
                    <div className="absolute z-50 mt-2 w-64 left-0 bg-amber-950 rounded-xl border-2 border-yellow-600 shadow-xl">
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
