
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

interface HaulItem {
  id: string;
  name: string;
  retailPrice: number;
  quantity: number;
  couponsApplied: number;
}

export default function HaulBuilderScreen() {
  const router = useRouter();
  const [haulName, setHaulName] = useState('');
  const [items, setItems] = useState<HaulItem[]>([]);
  const [extraBucksEarned, setExtraBucksEarned] = useState('0');

  const addSampleItem = () => {
    const sampleItems = [
      { name: 'Tide Detergent', retailPrice: 12.99, quantity: 1, couponsApplied: 5.00 },
      { name: 'Colgate Toothpaste', retailPrice: 4.99, quantity: 2, couponsApplied: 3.00 },
      { name: 'Advil Pain Relief', retailPrice: 8.99, quantity: 1, couponsApplied: 4.00 },
    ];
    
    const randomItem = sampleItems[Math.floor(Math.random() * sampleItems.length)];
    const newItem: HaulItem = {
      id: Date.now().toString(),
      ...randomItem,
    };
    
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateTotals = () => {
    const totalRetail = items.reduce((sum, item) => sum + (item.retailPrice * item.quantity), 0);
    const totalCoupons = items.reduce((sum, item) => sum + item.couponsApplied, 0);
    const outOfPocket = totalRetail - totalCoupons;
    const extraBucks = parseFloat(extraBucksEarned) || 0;
    const netCost = outOfPocket - extraBucks;

    return {
      totalRetail,
      totalCoupons,
      outOfPocket,
      extraBucks,
      netCost,
      savingsPercent: totalRetail > 0 ? ((totalRetail - outOfPocket) / totalRetail * 100).toFixed(0) : '0',
    };
  };

  const totals = calculateTotals();

  const saveHaul = () => {
    if (!haulName.trim()) {
      Alert.alert('Error', 'Please enter a haul name');
      return;
    }

    if (items.length === 0) {
      Alert.alert('Error', 'Please add at least one item');
      return;
    }

    // TODO: Backend Integration - Save haul to backend API
    // Example: await fetch('/api/hauls', { method: 'POST', body: JSON.stringify({ name: haulName, items, extraBucks: totals.extraBucks }) })

    Alert.alert(
      'Haul Saved!',
      `Your haul "${haulName}" has been saved with ${items.length} items and $${totals.netCost.toFixed(2)} net cost.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Build Your Haul',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Haul Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Weekly Grocery Run"
            placeholderTextColor={colors.textSecondary}
            value={haulName}
            onChangeText={setHaulName}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Items ({items.length})</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push('/scanner')}
            >
              <IconSymbol 
                ios_icon_name="barcode.viewfinder" 
                android_material_icon_name="camera" 
                size={20} 
                color="#FFFFFF" 
              />
              <Text style={styles.addButtonText}>Scan</Text>
            </TouchableOpacity>
          </View>

          {items.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol 
                ios_icon_name="cart" 
                android_material_icon_name="shopping-cart" 
                size={48} 
                color={colors.textSecondary} 
              />
              <Text style={styles.emptyText}>No items yet</Text>
              <TouchableOpacity 
                style={styles.sampleButton}
                onPress={addSampleItem}
              >
                <Text style={styles.sampleButtonText}>Add Sample Item</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <React.Fragment>
              {items.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                      <IconSymbol 
                        ios_icon_name="trash.fill" 
                        android_material_icon_name="delete" 
                        size={20} 
                        color={colors.error} 
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemDetailText}>
                      Qty: {item.quantity} × ${item.retailPrice.toFixed(2)}
                    </Text>
                    <Text style={styles.itemDetailText}>
                      Retail: ${(item.retailPrice * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.itemCoupons}>
                    <Text style={styles.couponLabel}>Coupons Applied:</Text>
                    <Text style={styles.couponValue}>-${item.couponsApplied.toFixed(2)}</Text>
                  </View>
                </View>
              ))}
            </React.Fragment>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ExtraBucks Earned</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.moneyInput}
              placeholder="0.00"
              placeholderTextColor={colors.textSecondary}
              value={extraBucksEarned}
              onChangeText={setExtraBucksEarned}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.totalsCard}>
          <Text style={styles.totalsTitle}>Haul Summary</Text>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Retail:</Text>
            <Text style={styles.totalValue}>${totals.totalRetail.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Coupons Applied:</Text>
            <Text style={[styles.totalValue, { color: colors.accent }]}>
              -${totals.totalCoupons.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Out of Pocket:</Text>
            <Text style={styles.totalValue}>${totals.outOfPocket.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>ExtraBucks Earned:</Text>
            <Text style={[styles.totalValue, { color: colors.accent }]}>
              ${totals.extraBucks.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.netCostRow}>
            <Text style={styles.netCostLabel}>Net Cost:</Text>
            <Text style={styles.netCostValue}>${totals.netCost.toFixed(2)}</Text>
          </View>

          <View style={styles.savingsBadge}>
            <Text style={styles.savingsText}>
              You&apos;re saving {totals.savingsPercent}%!
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={saveHaul}
        >
          <Text style={styles.saveButtonText}>Save Haul</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dollarSign: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  moneyInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 48,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
    marginBottom: 16,
  },
  sampleButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sampleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  itemCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemDetailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  itemCoupons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  couponLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  couponValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  totalsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  totalsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  netCostRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  netCostLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  netCostValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.accent,
  },
  savingsBadge: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  savingsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
