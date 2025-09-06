import uploadsData from "@/services/mockData/uploads.json";

class UploadsService {
  constructor() {
    this.uploads = [...uploadsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.uploads];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const upload = this.uploads.find(u => u.Id === parseInt(id));
    if (!upload) {
      throw new Error(`Upload with Id ${id} not found`);
    }
    return { ...upload };
  }

  async create(uploadData) {
    await new Promise(resolve => setTimeout(resolve, 450));
    const newId = Math.max(...this.uploads.map(u => u.Id)) + 1;
    const newUpload = {
      Id: newId,
      ...uploadData,
      uploadDate: new Date().toISOString(),
      status: "completed"
    };
    this.uploads.push(newUpload);
    return { ...newUpload };
  }

  async update(id, uploadData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.uploads.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Upload with Id ${id} not found`);
    }
    this.uploads[index] = { ...this.uploads[index], ...uploadData };
    return { ...this.uploads[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.uploads.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Upload with Id ${id} not found`);
    }
    const deleted = this.uploads.splice(index, 1)[0];
    return { ...deleted };
  }
}

export const uploadsService = new UploadsService();