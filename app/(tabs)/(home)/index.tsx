
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

interface Haul {
  id: string;
  name: string;
  itemCount: number;
  totalRetail: number;
  outOfPocket: number;
  extraBucks: number;
  netCost: number;
  date: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [hauls, setHauls] = useState<Haul[]>([
    {
      id: '1',
      name: 'Weekly Grocery Run',
      itemCount: 12,
      totalRetail: 89.47,
      outOfPocket: 23.15,
      extraBucks: 15.00,
      netCost: 8.15,
      date: '2025-01-15',
    },
    {
      id: '2',
      name: 'Beauty Haul',
      itemCount: 8,
      totalRetail: 124.99,
      outOfPocket: 31.50,
      extraBucks: 25.00,
      netCost: 6.50,
      date: '2025-01-12',
    },
  ]);

  const calculateSavings = (retail: number, outOfPocket: number) => {
    return ((retail - outOfPocket) / retail * 100).toFixed(0);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={commonStyles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>My Hauls</Text>
            <Text style={styles.headerSubtitle}>Track your CVS savings</Text>
          </View>
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={() => router.push('/scanner')}
          >
            <IconSymbol 
              ios_icon_name="barcode.viewfinder" 
              android_material_icon_name="camera" 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity 
            style={styles.createHaulButton}
            onPress={() => router.push('/haul-builder')}
          >
            <IconSymbol 
              ios_icon_name="plus.circle.fill" 
              android_material_icon_name="add-circle" 
              size={32} 
              color={colors.primary} 
            />
            <Text style={styles.createHaulText}>Create New Haul</Text>
          </TouchableOpacity>

          {hauls.map((haul) => (
            <TouchableOpacity 
              key={haul.id}
              style={styles.haulCard}
              onPress={() => router.push(`/haul/${haul.id}`)}
            >
              <View style={styles.haulHeader}>
                <View style={styles.haulTitleContainer}>
                  <Text style={styles.haulName}>{haul.name}</Text>
                  <Text style={styles.haulDate}>{haul.date}</Text>
                </View>
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsPercent}>
                    {calculateSavings(haul.totalRetail, haul.outOfPocket)}% OFF
                  </Text>
                </View>
              </View>

              <View style={styles.haulStats}>
                <View style={styles.statItem}>
                  <IconSymbol 
                    ios_icon_name="cart.fill" 
                    android_material_icon_name="shopping-cart" 
                    size={16} 
                    color={colors.textSecondary} 
                  />
                  <Text style={styles.statText}>{haul.itemCount} items</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Retail:</Text>
                  <Text style={styles.statValue}>${haul.totalRetail.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.haulFinancials}>
                <View style={styles.financialRow}>
                  <Text style={styles.financialLabel}>Out of Pocket:</Text>
                  <Text style={styles.financialValue}>${haul.outOfPocket.toFixed(2)}</Text>
                </View>
                <View style={styles.financialRow}>
                  <Text style={styles.financialLabel}>ExtraBucks Earned:</Text>
                  <Text style={[styles.financialValue, { color: colors.accent }]}>
                    ${haul.extraBucks.toFixed(2)}
                  </Text>
                </View>
                <View style={[styles.financialRow, styles.netCostRow]}>
                  <Text style={styles.netCostLabel}>Net Cost:</Text>
                  <Text style={styles.netCostValue}>${haul.netCost.toFixed(2)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scanButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  createHaulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  createHaulText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 12,
  },
  haulCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  haulHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  haulTitleContainer: {
    flex: 1,
  },
  haulName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  haulDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  savingsBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  savingsPercent: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  haulStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  haulFinancials: {
    gap: 8,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  financialLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  financialValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  netCostRow: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  netCostLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  netCostValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
  },
});
