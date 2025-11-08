/**
 * Game Analysis Tools for Age of Max
 * Analyzes missing features, generates fixes, and manages issues
 */
export interface GameIssue {
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    category: string;
    title: string;
    description: string;
    impact: string;
    effort: 'Small' | 'Medium' | 'Large';
    details: string[];
    status?: 'pending' | 'in-progress' | 'completed' | 'failed';
    fixCode?: string;
    files?: string[];
}
export interface AnalysisResult {
    issues: GameIssue[];
    totalCount: number;
    byPriority: {
        HIGH: number;
        MEDIUM: number;
        LOW: number;
    };
    byCategory: Record<string, number>;
    completionPercentage: number;
}
export declare class GameAnalyzer {
    private issuesFile;
    constructor(projectRoot?: string);
    /**
     * Load all issues from the analysis file
     */
    loadIssues(): AnalysisResult;
    /**
     * Get issues filtered by priority
     */
    getIssuesByPriority(priority: 'HIGH' | 'MEDIUM' | 'LOW'): GameIssue[];
    /**
     * Get issues filtered by category
     */
    getIssuesByCategory(category: string): GameIssue[];
    /**
     * Generate fix code for a specific issue
     */
    generateFix(issue: GameIssue): string;
    /**
     * Generate XP feedback fix code
     */
    private generateXPFeedbackFix;
    /**
     * Generate Gold feedback fix code
     */
    private generateGoldFeedbackFix;
    /**
     * Generate Formation fix code
     */
    private generateFormationFix;
    /**
     * Generate Kill Streak fix code
     */
    private generateKillStreakFix;
    /**
     * Generate Unit Selection fix code
     */
    private generateUnitSelectionFix;
    /**
     * Generate Sound System fix code
     */
    private generateSoundSystemFix;
    /**
     * Generate Music System fix code
     */
    private generateMusicSystemFix;
    /**
     * Create individual issue files for GitHub
     */
    createIssueFiles(outputDir?: string): void;
    /**
     * Generate markdown content for an issue
     */
    private generateIssueMarkdown;
}
export default GameAnalyzer;
//# sourceMappingURL=game-analyzer.d.ts.map