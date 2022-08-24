<template>
  <el-container>
    <el-col>
      <el-row id="title">如何创造一个色板</el-row>
      <el-row>
        <el-steps :active="-1" align-center>
          <el-step title="生成基础色板">
            <template #description>
              <el-card class="box-card">
                <template #header>
                  <img src="../pics/hue.png" class="image" alt="hue" />
                </template>
                <div class="card-content-title">生成基础色板</div>
                <div class="text-item">
                  {{
                    "\n· 设置HCL区间，或选择预设类型，控制生成颜色类型\n· 确定颜色种类，选择颜色生成算法\n· 确认生成基础色板"
                  }}
                </div>
              </el-card>
            </template>
          </el-step>
          <el-step title="保存基色">
            <template #description>
              <el-card class="box-card">
                <template #header>
                  <img
                    src="../pics/save_basic_color.png"
                    class="image"
                    alt="save_basic_color"
                  />
                </template>
                <div class="card-content-title">保存基色</div>
                <div class="text-item">
                  {{ "\n· 点击侧边栏保存基色色板\n" }}
                </div>
              </el-card>
            </template>
          </el-step>
          <el-step title="生成颜色梯度">
            <template #description>
              <el-card class="box-card">
                <template #header>
                  <img
                    src="../pics/gen_scale.png"
                    class="image"
                    alt="gen_scale"
                  />
                </template>
                <div class="card-content-title">生成颜色梯度</div>
                <div class="text-item">
                  {{
                    "\n· 调节侧边栏梯度数\n· 对每个颜色，先点击侧边栏基色旁的“生成颜色梯度”按钮，生成对应颜色的渐变色\n· 点击保存渐变色,保存该渐变色\n · 逐个生成、保存所有基色的渐变色"
                  }}
                </div>
              </el-card>
            </template>
          </el-step>
          <el-step title="生成色板">
            <template #description>
              <el-card class="box-card">
                <template #header>
                  <img
                    src="../pics/gen_palette.png"
                    class="image"
                    alt="gen_palette"
                  />
                </template>
                <div class="card-content-title">生成色板</div>
                <div class="text-item">
                  {{
                    "\n· 右键点击色块复制对应色号\n· 展开颜色面板复制对应渐变色号\n· 下方面板批量复制所有色号"
                  }}
                </div>
              </el-card>
            </template>
          </el-step>
          <el-step title="了解相应理论">
            <template #description>
              <el-card class="box-card">
                <template #header>
                  <img
                    src="../pics/learn_theory.png"
                    class="image"
                    alt="learn_theroy"
                  />
                </template>
                <div class="card-content-title">了解相应理论</div>
                <div class="text-item">
                  {{
                    "\n· L*a*b*色彩空间评估随机色分布\n· 色彩均匀分布算法\n· 贝塞尔曲线插值渐变\n· 亮度校正"
                  }}
                </div>
              </el-card>
            </template>
          </el-step>
        </el-steps>
      </el-row>
      <el-row id="guild_content">
        <el-col :span="10">
          <div class="guild_text">
            <div class="guild_title">设置HCL值</div>
            {{
              "\nC值：0-0.3去饱和度色彩，1-1.2饱和度好，2以上，过饱和颜色\n避免分散注意力——限制色度，只放最大色度\n保持同质化——限制亮度，有限范围亮度\n静音或让注意力集中某元素——某些元素接近背景色、低色度或亮度柔和——低色度、高亮度"
            }}
          </div>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
          <div class="guild_text">
            <div class="guild_title">建议颜色使用顺序</div>
            {{
              "\n确定主色\n基于分裂互补色——确定使用顺序\n基于使用顺序，调节颜色变化节奏为亮-暗-亮"
            }}
          </div>
        </el-col>
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

@font-face {
  font-family: "PingFang SC";
  src: url("../font/苹方黑体-准-简.ttf");
  font-weight: 400;
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

      .image {
        width: 100%;
      }

      .el-card__header {
        padding: 0;
        border-bottom: none;
      }

      .card-content-title {
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

#guild_content {
  margin-top: 56px;
}

.guild_text {
  height: 100%;
  padding: 12px 16px;

  background: #f5f7fa;
  border-radius: 8px;

  white-space: pre-wrap;

  font-family: "PingFang SC", serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;

  letter-spacing: -0.01px;

  color: #909399;

  .guild_title {
    margin-bottom: 5px;

    font-family: "PingFang SC", serif;
    font-size: 14px;

    color: #606266;
  }
}
</style>
