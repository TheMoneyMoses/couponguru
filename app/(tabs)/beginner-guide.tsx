
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { useRouter } from "expo-router";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  steps: number;
}

export default function BeginnerGuideScreen() {
  const router = useRouter();
  
  const [guideSteps] = useState<GuideStep[]>([
    {
      id: '1',
      title: 'Find Coupons',
      description: 'Learn where to get coupons: newspapers, in-store, manufacturer websites, and apps',
      icon: 'search',
      completed: false,
    },
    {
      id: '2',
      title: 'Organize Coupons',
      description: 'Set up a system to organize your coupons by category and expiration date',
      icon: 'folder',
      completed: false,
    },
    {
      id: '3',
      title: 'Match Sales',
      description: 'Learn to match coupons with store sales for maximum savings',
      icon: 'local-offer',
      completed: false,
    },
    {
      id: '4',
      title: 'Stack Coupons',
      description: 'Understand how to stack manufacturer + store + digital coupons',
      icon: 'layers',
      completed: false,
    },
    {
      id: '5',
      title: 'Track Rebates',
      description: 'Use rebate apps like Ibotta, Fetch, and Checkout 51 for extra savings',
      icon: 'payment',
      completed: false,
    },
    {
      id: '6',
      title: 'Plan Your Trip',
      description: 'Create a shopping list and plan your transactions for best results',
      icon: 'shopping-cart',
      completed: false,
    },
  ]);

  const [tutorials] = useState<Tutorial[]>([
    {
      id: '1',
      title: 'Your First CVS Haul',
      description: 'Step-by-step guide to your first extreme couponing trip at CVS',
      difficulty: 'beginner',
      duration: '15 min',
      steps: 8,
    },
    {
      id: '2',
      title: 'Understanding ExtraBucks',
      description: 'Master CVS ExtraBucks rewards and how to roll them for free items',
      difficulty: 'beginner',
      duration: '10 min',
      steps: 5,
    },
    {
      id: '3',
      title: 'Coupon Stacking 101',
      description: 'Learn the art of stacking multiple coupons on a single item',
      difficulty: 'intermediate',
      duration: '20 min',
      steps: 10,
    },
    {
      id: '4',
      title: 'Making Money with Rebates',
      description: 'Turn couponing into profit using rebate apps and reselling strategies',
      difficulty: 'advanced',
      duration: '30 min',
      steps: 12,
    },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return colors.accent;
      case 'intermediate':
        return '#F59E0B';
      case 'advanced':
        return colors.primary;
      default:
        return colors.textSecondary;
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={commonStyles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Beginner Guide</Text>
            <Text style={styles.headerSubtitle}>Learn to save like a pro</Text>
          </View>
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => {
              // TODO: Backend Integration - Open help/FAQ section
              console.log('Open help');
            }}
          >
            <IconSymbol 
              ios_icon_name="questionmark.circle" 
              android_material_icon_name="help" 
              size={24} 
              color={colors.primary} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeIcon}>
              <IconSymbol 
                ios_icon_name="star" 
                android_material_icon_name="star" 
                size={32} 
                color="#FFFFFF" 
              />
            </View>
            <Text style={styles.welcomeTitle}>Welcome to Extreme Couponing!</Text>
            <Text style={styles.welcomeText}>
              You&apos;re about to learn how to save 50-90% on your grocery bills. Follow these steps to get started.
            </Text>
          </View>

          {/* Getting Started Steps */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Getting Started</Text>
            <Text style={styles.sectionSubtitle}>Follow these steps in order</Text>
          </View>

          {guideSteps.map((step, index) => (
            <TouchableOpacity 
              key={step.id} 
              style={styles.stepCard}
              onPress={() => {
                // TODO: Backend Integration - Open detailed step guide
                console.log('Open step:', step.id);
              }}
            >
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  {step.completed && (
                    <IconSymbol 
                      ios_icon_name="checkmark.circle" 
                      android_material_icon_name="check-circle" 
                      size={20} 
                      color={colors.accent} 
                    />
                  )}
                </View>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="arrow-forward" 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          ))}

          {/* Video Tutorials */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Video Tutorials</Text>
            <Text style={styles.sectionSubtitle}>Learn by watching</Text>
          </View>

          {tutorials.map((tutorial) => (
            <TouchableOpacity 
              key={tutorial.id} 
              style={styles.tutorialCard}
              onPress={() => {
                // TODO: Backend Integration - Open video tutorial
                console.log('Open tutorial:', tutorial.id);
              }}
            >
              <View style={styles.tutorialIcon}>
                <IconSymbol 
                  ios_icon_name="play.circle" 
                  android_material_icon_name="play-arrow" 
                  size={32} 
                  color={colors.primary} 
                />
              </View>
              <View style={styles.tutorialContent}>
                <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
                <Text style={styles.tutorialDescription}>{tutorial.description}</Text>
                <View style={styles.tutorialMeta}>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(tutorial.difficulty) + '20' }]}>
                    <Text style={[styles.difficultyText, { color: getDifficultyColor(tutorial.difficulty) }]}>
                      {getDifficultyLabel(tutorial.difficulty)}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <IconSymbol 
                      ios_icon_name="clock" 
                      android_material_icon_name="schedule" 
                      size={14} 
                      color={colors.textSecondary} 
                    />
                    <Text style={styles.metaText}>{tutorial.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <IconSymbol 
                      ios_icon_name="list" 
                      android_material_icon_name="list" 
                      size={14} 
                      color={colors.textSecondary} 
                    />
                    <Text style={styles.metaText}>{tutorial.steps} steps</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Quick Tips */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Tips</Text>
          </View>

          <View style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <IconSymbol 
                ios_icon_name="lightbulb" 
                android_material_icon_name="info" 
                size={20} 
                color={colors.accent} 
              />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Start Small:</Text> Don&apos;t try to coupon everything at once. Pick 5-10 items per trip.
              </Text>
            </View>
            <View style={styles.tipItem}>
              <IconSymbol 
                ios_icon_name="lightbulb" 
                android_material_icon_name="info" 
                size={20} 
                color={colors.accent} 
              />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Know Store Policies:</Text> Each store has different coupon rules. Read them before shopping.
              </Text>
            </View>
            <View style={styles.tipItem}>
              <IconSymbol 
                ios_icon_name="lightbulb" 
                android_material_icon_name="info" 
                size={20} 
                color={colors.accent} 
              />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Be Patient:</Text> It takes time to build a stockpile. Don&apos;t buy unless it&apos;s a great deal.
              </Text>
            </View>
            <View style={styles.tipItem}>
              <IconSymbol 
                ios_icon_name="lightbulb" 
                android_material_icon_name="info" 
                size={20} 
                color={colors.accent} 
              />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Use Apps:</Text> Download Ibotta, Fetch Rewards, and store apps for digital coupons.
              </Text>
            </View>
          </View>

          {/* Common Mistakes */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Avoid These Mistakes</Text>
          </View>

          <View style={styles.mistakesCard}>
            <View style={styles.mistakeItem}>
              <IconSymbol 
                ios_icon_name="xmark.circle" 
                android_material_icon_name="error" 
                size={20} 
                color={colors.error} 
              />
              <Text style={styles.mistakeText}>
                Buying items you don&apos;t need just because you have a coupon
              </Text>
            </View>
            <View style={styles.mistakeItem}>
              <IconSymbol 
                ios_icon_name="xmark.circle" 
                android_material_icon_name="error" 
                size={20} 
                color={colors.error} 
              />
              <Text style={styles.mistakeText}>
                Not checking expiration dates on coupons and products
              </Text>
            </View>
            <View style={styles.mistakeItem}>
              <IconSymbol 
                ios_icon_name="xmark.circle" 
                android_material_icon_name="error" 
                size={20} 
                color={colors.error} 
              />
              <Text style={styles.mistakeText}>
                Forgetting to use rebate apps after shopping
              </Text>
            </View>
            <View style={styles.mistakeItem}>
              <IconSymbol 
                ios_icon_name="xmark.circle" 
                android_material_icon_name="error" 
                size={20} 
                color={colors.error} 
              />
              <Text style={styles.mistakeText}>
                Not organizing coupons - leads to missed savings
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
  helpButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  welcomeCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tutorialCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  tutorialIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tutorialContent: {
    flex: 1,
  },
  tutorialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  tutorialDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  tutorialMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tipsCard: {
    backgroundColor: colors.accent + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.accent + '30',
    gap: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: '600',
  },
  mistakesCard: {
    backgroundColor: colors.error + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.error + '30',
    gap: 16,
  },
  mistakeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  mistakeText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
