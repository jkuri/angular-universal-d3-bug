import { Component, OnInit, HostListener } from '@angular/core';
import { TransferState } from '@angularclass/universal-transfer-state';
import { isBrowser } from '../is-browser';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  svg: any;
  debounceResize: any;

  constructor(private cache: TransferState) {}

  ngOnInit() {
    this.cache.set('cached', true);
    this.renderWhiteArea();
  }

  renderWhiteArea(): void {
    if (!isBrowser) {
      return;
    }

    let w = window.innerWidth;
    let h = 300;

    let data = d3.range(15).map(() => Math.random() * (4.5 - 2.5) + 2.5);

    let x = d3.scaleLinear().domain([0, data.length - 1]).range([0, w]);
    let y = d3.scaleLinear().domain([0, 5]).range([h, 0]);

    this.svg = d3.select('.white-area').append('svg')
      .attr('width', w)
      .attr('height', h);

    let g = this.svg.append('g')
      .attr('transform', 'translate(0, 0)');

    let blueBackground = d3.area()
      .x((d: any, i: number) => x(i))
      .y0(h)
      .y1((d: any) => y(d))
      .curve(d3.curveBasis);

    let area = d3.area()
      .x((d: any, i: number) => x(i))
      .y0(h)
      .y1((d: any) => y(d) + 100)
      .curve(d3.curveLinear);

    // blue area
    g.append('path')
      .attr('d', blueBackground(data as any))
      .attr('fill', '#1658A1');

    // white area
    g.append('path')
      .attr('d', area(data as any))
      .attr('fill', '#FFFFFF');

    let circleData = data.map((d, i) => {
      return {
        r: 8,
        x: x(i),
        y: y(d) + 100
      };
    });

    let middleCircleData = data.map((d, i) => {
      return {
        r: Math.random() * (6 - 3) + 3,
        x: x(i) + (Math.random() * (30 - 30) + 30),
        y: y(d) + (Math.random() * -50)
      };
    });

    let topCircleData = data.map((d, i) => {
      return {
        r: Math.random() * (6 - 3) + 3,
        x: x(i) + (Math.random() * (70 - 30) + 30),
        y: y(d) + (Math.random() * (50 - 40) + 40)
      };
    });

    let lines = topCircleData.reduce((acc, curr, i) => acc.concat([middleCircleData[i], curr]),
      middleCircleData.reduce((acc, curr, i) => acc.concat([middleCircleData[i], curr]),
      middleCircleData.reduce((acc, curr, i) => acc.concat([circleData[i], curr]), [])));

    let line = d3.line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
      .curve(d3.curveLinear);

    // lines
    g.append('path')
      .attr('d', d => line(lines as any))
      .style('stroke-width', 1)
      .style('stroke', '#256AAD')
      .style('fill', 'none');

    // circles
    g.selectAll('.dot-circle')
      .data(circleData)
      .enter().append('circle')
      .attr('class', 'areaDot')
      .attr('r', d => d.r)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', '#F0F5FB')
      .attr('stroke', '#F08FB7')
      .attr('stroke-width', 2);

    g.selectAll('.dot-circle-middle')
      .data(middleCircleData)
      .enter().append('circle')
      .attr('class', 'areaDot')
      .attr('r', d => d.r)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', '#F0F5FB')
      .attr('stroke', '#F08FB7')
      .attr('stroke-width', 2);

    g.selectAll('.dot-circle-top')
      .data(topCircleData)
      .enter().append('circle')
      .attr('class', 'areaDot')
      .attr('r', d => d.r)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', '#F0F5FB')
      .attr('stroke', '#F08FB7')
      .attr('stroke-width', 2);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    clearTimeout(this.debounceResize);
    this.debounceResize = setTimeout(() => {
      d3.select('.white-area > svg').remove();
      this.renderWhiteArea();
    }, 300);
  }
}
