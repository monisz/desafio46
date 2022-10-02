class ClientMongoDb {
    constructor (collection, connect) {
        this.connection = connect;
        this.collection = collection;
        this.id = 1;
    }    

    async save(dto) {
        try {
            const allItems = await this.collection.find(); 
            dto['id'] = allItems.length + 1;
            try {
                const elementToSave = new this.collection(dto)
                const newElement = await elementToSave.save();
                return newElement
            }
            catch (error) {
                console.error(`el error al guardar fue: ${error}`);
                return null
            }
        }
        catch (error) {
            console.error(`error en Save ${error}`);
        }
    } 
        
    async replaceById(idSearch, data) {
        try {
            await this.collection.findOneAndUpdate({id: idSearch}, {$set: data});
            const result = await this.collection.find({id: idSearch});
            console.log(`replace id: ${result[0].id}`);
            return result
        }
        catch (error) {
            console.error(`error al reemplazar datos ${error}`);
            return null
        }
    }

    async getById(idSearch) {
        try {
            const objectFinded = await this.collection.find({id: idSearch});
            if (objectFinded.length > 0) {
                console.log(`objeto encontrado en getById, id: ${objectFinded[0].id}`);
                return objectFinded;
            }
            else return null;
        }
        catch (error) {
            console.error(`error al buscar por id ${error}`);
        }
    }

    async getAll() {
        try {
            const allItems = await this.collection.find();
            return allItems;
        }
        catch (error) {
            console.error(`error en getAll ${error}`);
            return [];
        }
    }

    async deleteById(idSearch) {
        try {
            return await this.collection.deleteOne({id: idSearch});
        }
        catch (error) {
            console.error(`error en deleteById ${error}`);
        }
    }
};

module.exports = { ClientMongoDb };