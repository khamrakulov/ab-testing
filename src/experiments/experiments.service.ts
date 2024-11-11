import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

interface Experiment {
  options: Record<string, number>;
  creationDate: string;
}

interface Experiments {
  [key: string]: Experiment;
}

@Injectable()
export class ExperimentsService {
  private experiments: Experiments = {
    buttonColor: {
      options: { '#FF0000': 33.3, '#00FF00': 33.3, '#0000FF': 33.3 },
      creationDate: '2024-01-01',
    },
    price: {
      options: { '10': 75, '20': 10, '50': 5, '5': 10 },
      creationDate: '2024-01-01',
    },
  };

  private userExperiments: Record<string, Record<string, string>> = {};

  assignExperiment(deviceToken: string): Record<string, string> {
    if (!this.userExperiments[deviceToken]) {
      this.userExperiments[deviceToken] = {};
    }

    const assignedExperiments = this.userExperiments[deviceToken];
    for (const experimentName in this.experiments) {
      if (!assignedExperiments[experimentName]) {
        const experiment = this.experiments[experimentName];
        const hashValue = this.getHashValue(deviceToken);

        let cumulative = 0;
        for (const [option, weight] of Object.entries(experiment.options)) {
          cumulative += weight;
          if (hashValue < cumulative) {
            assignedExperiments[experimentName] = option;
            break;
          }
        }
      }
    }

    return assignedExperiments;
  }

  getHashValue(deviceToken) {
    const hash = createHash('md5').update(deviceToken).digest('hex');
    const hashValue = parseInt(hash, 16) % 100;
    return hashValue;
  }

  async getStats() {
    const stats = {};
    for (const experimentName in this.experiments) {
      stats[experimentName] = Object.keys(
        this.experiments[experimentName].options,
      ).reduce((acc, option) => ({ ...acc, [option]: 0 }), {});
    }

    for (const userData of Object.values(this.userExperiments)) {
      for (const [experiment, option] of Object.entries(userData)) {
        if (option in stats[experiment]) {
          stats[experiment][option]++;
        }
      }
    }

    return stats;
  }
}
