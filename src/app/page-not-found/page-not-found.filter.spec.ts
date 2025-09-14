import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent filtering', () => {
  it('should return all topics when query is empty or whitespace', () => {
    const cmp = new PageNotFoundComponent();
    cmp.query = '';
    expect(cmp.filteredTopics.length).toBe(cmp.topics.length);

    cmp.query = '   ';
    expect(cmp.filteredTopics.length).toBe(cmp.topics.length);
  });

  it('should filter topics case-insensitively by substring of NAV key', () => {
    const cmp = new PageNotFoundComponent();

    cmp.query = 'python';
    expect(cmp.filteredTopics.some((t) => t.name === 'NAV.PYTHON')).toBe(true);

    cmp.query = 'JAVA';
    expect(cmp.filteredTopics.some((t) => t.name === 'NAV.JAVA')).toBe(true);

    cmp.query = 'zzz';
    expect(cmp.filteredTopics.length).toBe(0);
  });
});
