<template>
  <div class="p-4">
    <a-card title="非会员免费次数" class="mb-4">
      <a-form layout="inline">
        <a-form-item label="每日免费次数">
          <a-input-number v-model:value="freeDailyLimit" :min="0" :max="999" style="width: 120px" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="status" style="width: 100px">
            <a-select-option :value="1">启用</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注">
          <a-input v-model:value="remark" placeholder="可选" style="width: 260px" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" :loading="savingFree" @click="handleSaveFree">保存免费配额</a-button>
        </a-form-item>
      </a-form>
      <div class="text-gray-500 mt-2">未开通会员的用户，每日可点击「开始生成专属方案」的次数。</div>
    </a-card>

    <a-card title="各会员等级每日次数">
      <template #extra>
        <a-button type="primary" :loading="savingPlans" @click="handleSavePlans">保存套餐配额</a-button>
      </template>
      <a-table :columns="columns" :data-source="plans" :pagination="false" row-key="id" size="middle">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'aiNutritionDailyLimit'">
            <a-input-number
              v-model:value="record.aiNutritionDailyLimit"
              :min="0"
              :max="9999"
              style="width: 120px"
              placeholder="NULL=免费额度"
            />
            <span class="text-gray-400 ml-2 text-xs">0=不限</span>
          </template>
          <template v-else-if="column.dataIndex === 'status'">
            <a-tag :color="record.status === 1 ? 'green' : 'default'">{{ record.status === 1 ? '上架' : '下架' }}</a-tag>
          </template>
        </template>
      </a-table>
      <div class="text-gray-500 mt-3">
        说明：填写数字表示该套餐用户每日可用次数；填 <b>0</b> 表示不限次数；留空表示仍使用上方「非会员免费次数」。
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup name="fondia-ai-quota">
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import { getQuotaSummary, saveFreeQuota, savePlanQuotas } from './quota.api';

const featureCode = 'AI_NUTRITION';
const freeDailyLimit = ref(2);
const status = ref(1);
const remark = ref('');
const plans = ref<any[]>([]);
const savingFree = ref(false);
const savingPlans = ref(false);

const columns = [
  { title: '套餐编码', dataIndex: 'planCode', width: 140 },
  { title: '名称', dataIndex: 'name', width: 160 },
  { title: '有效天数', dataIndex: 'durationDays', width: 100 },
  { title: '每日专属方案次数', dataIndex: 'aiNutritionDailyLimit', width: 220 },
  { title: '状态', dataIndex: 'status', width: 90 },
];

async function loadData() {
  const data = await getQuotaSummary({ feature: featureCode });
  freeDailyLimit.value = data?.freeDailyLimit ?? 2;
  status.value = data?.status ?? 1;
  remark.value = data?.remark ?? '';
  plans.value = (data?.plans ?? []).map((item) => ({ ...item }));
}

async function handleSaveFree() {
  savingFree.value = true;
  try {
    await saveFreeQuota({
      featureCode,
      freeDailyLimit: freeDailyLimit.value,
      status: status.value,
      remark: remark.value,
    });
    message.success('免费配额已保存');
  } finally {
    savingFree.value = false;
  }
}

async function handleSavePlans() {
  savingPlans.value = true;
  try {
    await savePlanQuotas({ plans: plans.value });
    message.success('套餐配额已保存');
    await loadData();
  } finally {
    savingPlans.value = false;
  }
}

onMounted(loadData);
</script>
