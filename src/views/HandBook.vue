<template>
  <el-container>
    <el-col>
      <el-row id="title">如何创造一个色板</el-row>
      <el-row>
        <el-steps :active="-1" align-center>
          <el-step title="生成基础色板">
            <template #description>
              <el-card class="box-card" header="生成基础色板">
                <div class="text-item">
                  {{
                    "· 设置HCL区间，或选择预设类型，控制生成颜色类型\n· 确定颜色种类，选择颜色生成算法\n· 确认生成基础色板"
                  }}
                </div>
              </el-card>
            </template>
          </el-step>
          <el-step title="保存基色">
            <template #description>
              <el-card class="box-card" header="保存基色">
                <div class="text-item">
                  {{ "· 点击侧边栏保存基色色板\n" }}
                </div>
              </el-card>
            </template>
          </el-step>
          <el-step title="生成颜色梯度">
            <template #description>
              <el-card class="box-card" header="保存基色">
                <div class="text-item">
                  {{
                    "· 调节侧边栏梯度数\n· 对每个颜色，先点击侧边栏基色旁的“生成颜色梯度”按钮，生成对应颜色的渐变色\n· 点击保存渐变色,保存该渐变色\n · 逐个生成、保存所有基色的渐变色"
                  }}
                </div>
              </el-card>
            </template>
          </el-step>
          <el-step title="生成色板">
            <template #description>
              <el-card class="box-card" header="生成色板">
                <div class="text-item">
                  {{
                    "· 展开颜色面板复制对应渐变色号\n· 下方面板批量复制所有色号"
                  }}
                </div>
              </el-card>
            </template>
          </el-step>
          <el-step title="了解相应理论">
            <template #description>
              <el-card class="box-card" header="了解相应理论">
                <div class="text-item">
                  {{
                    "· L*a*b*色彩空间评估随机色分布\n· 色彩均匀分布算法\n· 贝塞尔曲线插值渐变\n· 亮度校正"
                  }}
                </div>
              </el-card>
            </template>
          </el-step>
        </el-steps>
      </el-row>
    </el-col>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@font-face {
  font-family: "PingFang SC";
  src: url("../font/苹方黑体-中黑-简.ttf");
  font-weight: 500;
  font-style: normal;
}

.el-container {
  padding-left: 36px;
}

#title {
  font-family: "PingFang SC", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;

  color: #303133;
}

.el-steps {
  width: 100%;

  margin-top: 36px;

  :deep(.el-step__main) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :deep(.el-step__description) {
    margin-top: 50px;
    padding: 0;

    .el-card {
      width: 230px;

      border: 1px solid #e4e7ed;
      border-radius: 8px;

      text-align: left;

      .el-card__header {
        font-family: "PingFang SC", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;

        color: #303133;
      }

      .el-card__body {
        white-space: pre-wrap;

        font-family: "PingFang SC", serif;
        font-size: 12px;

        letter-spacing: -0.01px;

        color: #909399;
      }
    }
  }
}
</style>
