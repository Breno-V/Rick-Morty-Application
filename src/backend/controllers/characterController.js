import { getAllCharacters, getCharacterByPk, searchCharactersByName } from "../services/characterService.js";

export const catchAllCharacter = async (req, res) => {
    const { page } = req.query;

    try {
        const data = await getAllCharacters(page);
        return res.json(data);
    } catch (error) {
        console.error("Erro ao buscar os personagens: ", error);
        return res.status(500).json({ error: "Erro ao buscar os personagens" });
    }
};

export const catchCharacterByPk = async (req, res) => {
    const { id } = req.params;

    try {
        const character = await getCharacterByPk(id);
        return res.json(character);
    } catch (error) {
        console.error("Erro ao buscar o personagem em específico: ", error);
        return res.status(404).json({ error: "Personagem não encontrado" })
    }
}

export const catchCharactersByName = async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "Parâmetro 'name' é obrigatório!" });
    }

    try {
        const data = await searchCharactersByName(name);
        return res.json(data);
    } catch (error) {
        console.error("Erro ao buscar o nome do personagem: ", error);
        return res.status(404).json({error: "Nenhum personagem encontrado"})
    }
}