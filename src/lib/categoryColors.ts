/**
 * 分类颜色管理工具类
 * 基于分类ID动态生成稳定、美观的颜色
 */
export class CategoryColorManager {
  // 预定义的美观颜色组合池
  private static readonly COLOR_PALETTE = [
    'bg-blue-100 text-blue-800',       // 蓝色 - 适合通用/公告类
    'bg-green-100 text-green-800',     // 绿色 - 适合车辆/环保类  
    'bg-red-100 text-red-800',         // 红色 - 适合重要/紧急类
    'bg-yellow-100 text-yellow-800',   // 黄色 - 适合安全/警告类
    'bg-purple-100 text-purple-800',   // 紫色 - 适合服务/高端类
    'bg-pink-100 text-pink-800',       // 粉色 - 适合活动/促销类
    'bg-indigo-100 text-indigo-800',   // 靛蓝 - 适合技术/创新类
    'bg-orange-100 text-orange-800',   // 橙色 - 适合警示/提醒类
    'bg-teal-100 text-teal-800',       // 青色 - 适合环境/清新类
    'bg-cyan-100 text-cyan-800',       // 天青 - 适合科技/现代类
    'bg-lime-100 text-lime-800',       // 酸橙 - 适合自然/健康类
    'bg-amber-100 text-amber-800',     // 琥珀 - 适合温暖/舒适类
  ] as const;

  // 默认颜色（用于未知分类）
  private static readonly DEFAULT_COLOR = 'bg-gray-100 text-gray-800';

  /**
   * 基于分类ID生成稳定的颜色
   * 同一个ID总是返回相同的颜色
   * @param categoryId 分类ID
   * @returns Tailwind CSS颜色类名
   */
  static getColorById(categoryId: number): string {
    // 处理特殊情况：ID为0或负数时使用默认颜色
    if (categoryId <= 0) {
      return this.DEFAULT_COLOR;
    }

    // 使用模运算确保颜色索引在有效范围内
    const colorIndex = categoryId % this.COLOR_PALETTE.length;
    return this.COLOR_PALETTE[colorIndex];
  }

  /**
   * 基于分类key生成颜色（用于兼容现有代码）
   * @param categoryKey 分类key/slug
   * @returns Tailwind CSS颜色类名
   */
  static getColorByKey(categoryKey: string): string {
    // 如果是特殊的"全部"分类
    if (categoryKey === 'all') {
      return 'bg-slate-100 text-slate-800';
    }

    // 基于字符串生成稳定的哈希值
    const hash = this.hashString(categoryKey);
    const colorIndex = hash % this.COLOR_PALETTE.length;
    return this.COLOR_PALETTE[colorIndex];
  }

  /**
   * 字符串哈希函数（简单版DJB2算法）
   * 生成稳定的哈希值，确保相同字符串总是返回相同结果
   * @param str 输入字符串
   * @returns 正整数哈希值
   */
  private static hashString(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return Math.abs(hash);
  }

  /**
   * 获取所有可用颜色（用于测试或预览）
   * @returns 所有颜色类名数组
   */
  static getAllColors(): readonly string[] {
    return this.COLOR_PALETTE;
  }

  /**
   * 获取颜色总数
   * @returns 颜色数量
   */
  static getColorCount(): number {
    return this.COLOR_PALETTE.length;
  }
} 