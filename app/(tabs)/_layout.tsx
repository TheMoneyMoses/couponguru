
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'shopping-cart',
      label: 'Hauls',
    },
    {
      name: 'coupon-sources',
      route: '/(tabs)/coupon-sources',
      icon: 'local-offer',
      label: 'Sources',
    },
    {
      name: 'weekly-inserts',
      route: '/(tabs)/weekly-inserts',
      icon: 'description',
      label: 'Inserts',
    },
    {
      name: 'beginner-guide',
      route: '/(tabs)/beginner-guide',
      icon: 'school',
      label: 'Guide',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person',
      label: 'Profile',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="coupon-sources" name="coupon-sources" />
        <Stack.Screen key="weekly-inserts" name="weekly-inserts" />
        <Stack.Screen key="beginner-guide" name="beginner-guide" />
        <Stack.Screen key="profile" name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={380} />
    </>
  );
}
