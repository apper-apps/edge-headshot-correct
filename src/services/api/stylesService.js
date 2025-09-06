import stylesData from "@/services/mockData/styles.json";

class StylesService {
  constructor() {
    this.styles = [...stylesData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.styles];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const style = this.styles.find(s => s.Id === parseInt(id));
    if (!style) {
      throw new Error(`Style with Id ${id} not found`);
    }
    return { ...style };
  }

  async create(styleData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...this.styles.map(s => s.Id)) + 1;
    const newStyle = {
      Id: newId,
      ...styleData,
      createdAt: new Date().toISOString()
    };
    this.styles.push(newStyle);
    return { ...newStyle };
  }

  async update(id, styleData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = this.styles.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Style with Id ${id} not found`);
    }
    this.styles[index] = { ...this.styles[index], ...styleData };
    return { ...this.styles[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.styles.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Style with Id ${id} not found`);
    }
    const deleted = this.styles.splice(index, 1)[0];
    return { ...deleted };
  }
}

export const stylesService = new StylesService();