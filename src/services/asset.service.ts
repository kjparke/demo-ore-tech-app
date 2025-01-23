import API from "../Api";
import { Asset } from "../interfaces/Asset";
import { Payload } from "../interfaces/Payload";

const ASSET_ENDPOINT = "/asset";

class AssetService {
    createAsset = async (asset: Payload) => {
        return API.post(ASSET_ENDPOINT + `/`, asset);
    }

    getAssets = async () => {
        return API.get(ASSET_ENDPOINT + "/");
    }

    getDownAssets = async () => {
        return API.get(ASSET_ENDPOINT + "/down-assets");
    }

    getOperationalAssets = async () => {
        return API.get(ASSET_ENDPOINT + "/operationalAssets")
    }

    updateAsset = async (asset: Asset) => {
        return API.patch(ASSET_ENDPOINT + `/${asset._id}`, asset);
    }

    releaseAsset = async (asset: Payload) => {
        return API.post(ASSET_ENDPOINT + `/release`, asset);
    }

    importAsset = async (update: Payload) => {
        return API.patch(ASSET_ENDPOINT + "/manualImport", update);
    }
} 

const assetServiceInstance = new AssetService(); 
export default assetServiceInstance;