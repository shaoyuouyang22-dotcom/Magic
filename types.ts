export interface GenerationState {
  status: 'idle' | 'loading' | 'success' | 'error';
  imageUrl?: string;
  error?: string;
}

export enum ArtStyle {
  INK_WASH = 'Chinese Ink Wash Painting (水墨画)',
  WATERCOLOR = 'Soft Watercolor (水彩)',
  REALISTIC = 'Cinematic Realistic (写实)',
  OIL_PAINTING = 'Classical Oil Painting (油画)',
  UQIYO_E = 'Ukiyo-e Style (浮世绘)'
}

export interface ImageRequest {
  poem: string;
  style: ArtStyle;
}