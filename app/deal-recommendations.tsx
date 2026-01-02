
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface DealRecommendation {
  id: string;
  productName: string;
  store: string;
  retailPrice: number;
  salePrice: number;
  couponValue: number;
  finalPrice: number;
  profitPotential?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  steps: string[];
  couponsNeeded: string[];
  rebatesAvailable: string[];
}

export default function DealRecommendationsScreen() {
  const router = useRouter();
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [recommendations, setRecommendations] = useState<DealRecommendation[]>([
    {
      id: '1',
      productName: 'Tide Pods 42ct',
      store: 'CVS',
      retailPrice: 12.99,
      salePrice: 8.99,
      couponValue: 3.00,
      finalPrice: 5.99,
      profitPotential: 2.00,
      difficulty: 'easy',
      steps: [
        'Buy Tide Pods 42ct on sale for $8.99',
        'Use $3 off manufacturer coupon from SmartSource insert',
        'Submit receipt to Ibotta for $4 rebate',
        'Final cost: $1.99 or $2 profit after rebate',
      ],
      couponsNeeded: ['$3 off Tide Pods (SmartSource 1/19)'],
      rebatesAvailable: ['Ibotta: $4', 'Fetch Rewards: 500 pts'],
    },
    {
      id: '2',
      productName: 'Colgate Toothpaste',
      store: 'CVS',
      retailPrice: 4.99,
      salePrice: 3.49,
      couponValue: 2.00,
      finalPrice: 1.49,
      profitPotential: 0.51,
      difficulty: 'easy',
      steps: [
        'Buy Colgate Toothpaste on sale for $3.49',
        'Use $2 off manufacturer coupon',
        'Clip $1 CVS digital coupon',
        'Submit to Ibotta for $2 rebate',
        'Final cost: FREE + $0.51 profit',
      ],
      couponsNeeded: ['$2 off Colgate (RedPlum 1/19)', '$1 CVS Digital'],
      rebatesAvailable: ['Ibotta: $2'],
    },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return colors.accent;
      case 'medium':
        return '#F59E0B';
      case 'hard':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const searchDeals = () => {
    if (!zipCode || zipCode.length < 5) {
      Alert.alert('Invalid Zip Code', 'Please enter a valid 5-digit zip code');
      return;
    }

    setLoading(true);
    // TODO: Backend Integration - Fetch AI-powered deal recommendations based on zip code
    // This will call the GPT-5.2 powered backend to analyze current deals, coupons, and rebates
    console.log('Searching deals for zip code:', zipCode);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Deals Updated', 'Found personalized deals for your area!');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Deal Recommendations',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />
      <View style={styles.container}>
        {/* Zip Code Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <IconSymbol 
              ios_icon_name="location" 
              android_material_icon_name="place" 
              size={20} 
              color={colors.textSecondary} 
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter your zip code"
              placeholderTextColor={colors.textSecondary}
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={searchDeals}
            disabled={loading}
          >
            <Text style={styles.searchButtonText}>
              {loading ? 'Searching...' : 'Find Deals'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* AI Info Banner */}
        <View style={styles.aiInfoBanner}>
          <IconSymbol 
            ios_icon_name="sparkles" 
            android_material_icon_name="star" 
            size={24} 
            color={colors.primary} 
          />
          <View style={styles.aiInfoText}>
            <Text style={styles.aiInfoTitle}>AI-Powered Recommendations</Text>
            <Text style={styles.aiInfoSubtitle}>
              Personalized deals based on your location, available coupons, and profit potential
            </Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Filter Options */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Show me deals that are:</Text>
            <View style={styles.filterButtons}>
              <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
                <Text style={[styles.filterButtonText, styles.filterButtonTextActive]}>All Deals</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Money Makers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Free Items</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Deal Cards */}
          {recommendations.map((deal) => (
            <View key={deal.id} style={styles.dealCard}>
              <View style={styles.dealHeader}>
                <View style={styles.dealTitleContainer}>
                  <Text style={styles.dealProductName}>{deal.productName}</Text>
                  <Text style={styles.dealStore}>{deal.store}</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(deal.difficulty) }]}>
                  <Text style={styles.difficultyText}>{deal.difficulty.toUpperCase()}</Text>
                </View>
              </View>

              {/* Pricing Breakdown */}
              <View style={styles.pricingSection}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Retail Price:</Text>
                  <Text style={styles.priceValue}>${deal.retailPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Sale Price:</Text>
                  <Text style={[styles.priceValue, { color: colors.accent }]}>${deal.salePrice.toFixed(2)}</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>After Coupons:</Text>
                  <Text style={[styles.priceValue, { color: colors.accent }]}>${deal.finalPrice.toFixed(2)}</Text>
                </View>
                {deal.profitPotential && deal.profitPotential > 0 && (
                  <View style={[styles.priceRow, styles.profitRow]}>
                    <Text style={styles.profitLabel}>Profit Potential:</Text>
                    <Text style={styles.profitValue}>+${deal.profitPotential.toFixed(2)}</Text>
                  </View>
                )}
              </View>

              {/* Steps */}
              <View style={styles.stepsSection}>
                <Text style={styles.sectionLabel}>How to Get This Deal:</Text>
                {deal.steps.map((step, index) => (
                  <View key={index} style={styles.stepRow}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>

              {/* Coupons Needed */}
              <View style={styles.couponsSection}>
                <Text style={styles.sectionLabel}>Coupons Needed:</Text>
                {deal.couponsNeeded.map((coupon, index) => (
                  <View key={index} style={styles.couponRow}>
                    <IconSymbol 
                      ios_icon_name="ticket" 
                      android_material_icon_name="local-offer" 
                      size={16} 
                      color={colors.primary} 
                    />
                    <Text style={styles.couponText}>{coupon}</Text>
                  </View>
                ))}
              </View>

              {/* Rebates */}
              <View style={styles.rebatesSection}>
                <Text style={styles.sectionLabel}>Rebates Available:</Text>
                {deal.rebatesAvailable.map((rebate, index) => (
                  <View key={index} style={styles.rebateRow}>
                    <IconSymbol 
                      ios_icon_name="dollarsign" 
                      android_material_icon_name="payment" 
                      size={16} 
                      color={colors.accent} 
                    />
                    <Text style={styles.rebateText}>{rebate}</Text>
                  </View>
                ))}
              </View>

              {/* Action Button */}
              <TouchableOpacity 
                style={styles.addToHaulButton}
                onPress={() => {
                  Alert.alert('Add to Haul', 'This deal will be added to your haul builder');
                  router.push('/haul-builder');
                }}
              >
                <IconSymbol 
                  ios_icon_name="plus" 
                  android_material_icon_name="add" 
                  size={20} 
                  color="#FFFFFF" 
                />
                <Text style={styles.addToHaulText}>Add to Haul</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Beginner Tip */}
          <View style={styles.tipCard}>
            <IconSymbol 
              ios_icon_name="lightbulb" 
              android_material_icon_name="info" 
              size={24} 
              color={colors.accent} 
            />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Beginner Tip</Text>
              <Text style={styles.tipText}>
                Start with &quot;Easy&quot; deals to learn the process. Once you&apos;re comfortable, try &quot;Medium&quot; and &quot;Hard&quot; deals for bigger savings!
              </Text>
            </View>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  aiInfoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  aiInfoText: {
    flex: 1,
  },
  aiInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  aiInfoSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  dealCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dealTitleContainer: {
    flex: 1,
  },
  dealProductName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  dealStore: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pricingSection: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  profitRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 0,
  },
  profitLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  profitValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
  },
  stepsSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  couponsSection: {
    marginBottom: 16,
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  couponText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  rebatesSection: {
    marginBottom: 16,
  },
  rebateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  rebateText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  addToHaulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  addToHaulText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: colors.accent + '10',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.accent + '30',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
