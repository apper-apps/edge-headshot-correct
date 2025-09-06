import headshotsData from "@/services/mockData/headshots.json";

class HeadshotsService {
  constructor() {
    this.headshots = [...headshotsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350));
    return [...this.headshots];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const headshot = this.headshots.find(h => h.Id === parseInt(id));
    if (!headshot) {
      throw new Error(`Headshot with Id ${id} not found`);
    }
    return { ...headshot };
  }

  async create(headshotData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newId = Math.max(...this.headshots.map(h => h.Id)) + 1;
    const newHeadshot = {
      Id: newId,
      ...headshotData,
      generatedDate: new Date().toISOString(),
      downloadCount: 0
    };
    this.headshots.push(newHeadshot);
    return { ...newHeadshot };
  }

  async update(id, headshotData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.headshots.findIndex(h => h.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Headshot with Id ${id} not found`);
    }
    this.headshots[index] = { ...this.headshots[index], ...headshotData };
    return { ...this.headshots[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.headshots.findIndex(h => h.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Headshot with Id ${id} not found`);
    }
    const deleted = this.headshots.splice(index, 1)[0];
    return { ...deleted };
  }

  async incrementDownloadCount(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.headshots.findIndex(h => h.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Headshot with Id ${id} not found`);
    }
    this.headshots[index].downloadCount += 1;
    return { ...this.headshots[index] };
  }
}

export const headshotsService = new HeadshotsService();