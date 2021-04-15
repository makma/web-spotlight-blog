import {DeliveryClient} from "@kentico/kontent-delivery";

export const deliveryClient = new DeliveryClient({
    projectId: process.env.REACT_APP_PROJECT_ID!,
    previewApiKey: process.env.REACT_APP_PREVIEW_API_KEY,
    globalQueryConfig: {
        usePreviewMode: true
    }
});