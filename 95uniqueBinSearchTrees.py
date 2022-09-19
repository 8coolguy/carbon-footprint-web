# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        return self.generate (range(1, n+1))
    def generate (self, vs):
        n = len(vs)
        if n == 0:
            return [None]
        elif n == 1:
            return [TreeNode (vs[0], None, None)]
        elif n == 2:
            return ([TreeNode (vs[1], TreeNode (vs[0], None, None), None), 
                     TreeNode (vs[0], None, TreeNode(vs[1], None, None))])
        else:
            ans = []
            for i in range(0,n):
                left_subtrees = self.generate(vs[0:i])
                right_subtrees = self.generate(vs[i+1:n])
                
                for lst in left_subtrees:
                    for rst in right_subtrees:
                        ans.append(TreeNode(vs[i], lst, rst))
                        
        return ans
    
        
            
            
        
        
