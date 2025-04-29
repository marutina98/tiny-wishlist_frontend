import { useEventBus } from '@vueuse/core';

const eventBusRefetch = useEventBus<boolean>('refetch');

export default eventBusRefetch;