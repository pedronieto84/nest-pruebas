import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'elCOlapsoDeOccidente';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
