import type { Reactive } from 'vue';

class SHelpers {

  public getPlaceholderImage() {
    return 'https://placehold.co/500';
  }

  public async dataURLToBlob(base64: string) {
    try {

      const request = await fetch(base64);

      if (!request.ok) {
        throw new Error('Image could not be fetched.');
      }
      
      return await request.blob();

    } catch (error: unknown) {
      console.error(error);
    }
  }

  public blobToDataURL(blob: Blob, callback: Function) {

    try {

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          callback(e.target.result);
        } else {
          throw new Error('Failed to read the blob as data URL.');
        }
      };

      reader.readAsDataURL(blob);

    } catch (error: unknown) {
      console.error(error);
    }

  }

  public handleThumbnailChange(event: Event, state: Reactive<{thumbnail: File}> ) {

    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      state.thumbnail = target.files[0];
    }

  }
  
}

export default new SHelpers();