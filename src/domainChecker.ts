interface DomainCheckResult {
  domain: string;
  available: boolean;
}

export class DomainChecker {
  private static readonly CHECK_PATH = '/p/index.php';
  private static readonly DEFAULT_DOMAINS = [
    'https://z-lib.gd',
    'https://1lib.sk',
    'https://z-lib.fm',
    'https://z-lib.gl',
    'https://z-lib.fo',
    'https://z-library.sk',
    'https://zh.z-library.ec'
  ];

  /**
   * 检查单个域名的可用性
   * @param domain 要检查的域名
   * @returns Promise<boolean> 域名是否可用
   */
  public static async checkSingleDomain(domain: string): Promise<boolean> {
    try {
      const url = `${domain}${this.CHECK_PATH}?v=${Date.now()}`;
      const response = await fetch(url);
      return response.status === 200 && (await response.text()).length > 0;
    } catch {
      return false;
    }
  }

  /**
   * 批量检查多个域名的可用性
   * @param domains 要检查的域名数组(可选，默认使用内置域名列表)
   * @returns Promise<DomainCheckResult[]> 检查结果数组
   */
  public static async checkDomains(
    domains: string[] = this.DEFAULT_DOMAINS
  ): Promise<DomainCheckResult[]> {
    const checks = domains.map(async (domain) => {
      const available = await this.checkSingleDomain(domain);
      return { domain, available };
    });

    return Promise.all(checks);
  }

  /**
   * 查找第一个可用的域名
   * @param domains 要检查的域名数组(可选，默认使用内置域名列表)
   * @returns Promise<string | null> 第一个可用的域名，如果没有则返回null
   */
  public static async findFirstAvailable(
    domains: string[] = this.DEFAULT_DOMAINS
  ): Promise<string | null> {
    for (const domain of domains) {
      const available = await this.checkSingleDomain(domain);
      if (available) {
        return domain;
      }
    }
    return null;
  }
}