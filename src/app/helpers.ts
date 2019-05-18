import { CloudData } from 'angular-tag-cloud-module';

export function randomData(cnt?: number, rotate?: boolean): CloudData[] {
  if (!cnt) { cnt = 20; }

  const cd: CloudData[] = [];

  for (let i = 0; i < cnt; i++) {
    let link: string;
    let color: string;
    let external: boolean;
    let weight = 5;
    let text = '';
    let r = 0;

    // randomly set link attribute and external
    if (Math.random() >= 0.5) {
      link = 'http://example.org';
      if (Math.random() >= 0.5) { external = true; }
    }

    // randomly set color attribute
    if (Math.random() >= 0.5) {
      color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    // randomly rotate some elements (less probability)
    if ((Math.random() >= 0.7) && rotate) {
      const plusMinus = Math.random() >= 0.5 ? '' : '-';
      r = Math.floor(Math.random() * Number(`${plusMinus}20`) + 1);
    }

    // set random weight
    weight = Math.floor((Math.random() * 10) + 1);

    text = `weight-${weight}`;
    if (color) { text += '-color'; }
    if (link) { text += '-link'; }
    if (external) { text += '-external'; }

    const el: CloudData = {
      text,
      weight,
      color,
      link,
      external,
      rotate: r,
      // tooltip: 'tooltip'
    };

    cd.push(el);
  }

  return cd;
}
