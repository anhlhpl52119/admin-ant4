// import type { Component } from 'vue';
// import { useApplicationStore } from '@/stores/application.store';

// interface Props {
//   component: Component
// }

// export const useAppDrawer = (props: Props) => {
//   const { isAppDrawerVisible, drawerComponent } = storeToRefs(useApplicationStore());
//   const openDrawer = () => {
//     drawerComponent.value = props.component;
//     isAppDrawerVisible.value = true;
//   };
//   const closeDrawer = () => {
//     drawerComponent.value = undefined;
//     isAppDrawerVisible.value = false;
//   };

//   return {
//     openDrawer,
//     closeDrawer,
//   };
// };
