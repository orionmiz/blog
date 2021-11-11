import { getLinkedPostsId } from "../lib/posts";

describe('Post', () => {
  it('Check Linked Page from Filesystem', () => {

    const middle = getLinkedPostsId('example-file-1');
    expect(middle.prev).toBe(undefined);
    expect(middle.next).toBe('example-file-2');

    const last = getLinkedPostsId(middle.next as string);
    expect(last.prev).toBe('example-file-1');
    expect(last.next).toBe('example-file-3');
    
  })
});