export interface RecipeIngredientItem {
  name: string;
  amount: string;
  image?: string;
  sortNo?: number;
}

export interface RecipeStepItem {
  stepNo?: number;
  image?: string;
  content: string;
  tip?: string;
  sortNo?: number;
}

export interface RecipeFormModel {
  id?: number;
  title: string;
  subtitle?: string;
  description?: string;
  cuisineId?: number;
  categoryId?: number;
  coverImage?: string;
  videoUrl?: string;
  videoDuration?: number;
  difficulty?: number;
  cookMinutes?: number;
  calories?: number;
  servingSize?: string;
  tagIds: number[];
  ingredients: RecipeIngredientItem[];
  steps: RecipeStepItem[];
  sortNo?: number;
  isRecommend?: number;
  status?: number;
}

export interface CategoryTreeNode {
  id: number;
  parentId?: number;
  name: string;
  categoryLevel?: number;
  children?: CategoryTreeNode[];
}

export function createEmptyRecipe(): RecipeFormModel {
  return {
    title: '',
    subtitle: '',
    description: '',
    tagIds: [],
    ingredients: [{ name: '', amount: '' }],
    steps: [{ content: '', tip: '' }],
    sortNo: 0,
    isRecommend: 0,
    status: 1,
    servingSize: '2-3人份',
  };
}

export function flattenCategoryTree(nodes: CategoryTreeNode[] = []) {
  const cuisines: { label: string; value: number }[] = [];
  const categoryMap = new Map<number, { label: string; value: number }[]>();

  nodes.forEach((node) => {
    if (node.categoryLevel === 1) {
      cuisines.push({ label: node.name, value: node.id });
      const children = (node.children || []).map((child) => ({
        label: child.name,
        value: child.id,
      }));
      categoryMap.set(node.id, children);
    }
  });

  return { cuisines, categoryMap };
}

export function isHttpUrl(value?: string) {
  return !!value && /^https?:\/\//i.test(value);
}

export const difficultyOptions = [
  { label: '简单', value: 1 },
  { label: '中等', value: 2 },
  { label: '困难', value: 3 },
];

export const difficultyText = (value?: number) =>
  difficultyOptions.find((item) => item.value === value)?.label || '--';
