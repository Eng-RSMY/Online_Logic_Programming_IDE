%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Template for a SPARC file
%% Author: 
%% Description:
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
sorts

#co={10,50,100,150}.
#obj={square, curve}.
#fluent = on(#obj,#co,#co).
#action = move(#obj,#co,#co).
#step = 1..10. 
#frame = 1..60. 
#r = 1..1000.
#sa = 0..16.
#se = 0..16. 


predicates

draw_line(#obj,#co,#co,#co,#co).
occurs(#action,#frame).
draw_quad_curve(#obj, #co,#co,#co,#co,#co,#co).
%draw_bezier_curve(#obj, #co,#co,#co,#co,#co,#co,#co,#co).
draw_arc_curve(#obj,#co,#co,#r,#sa,#se).
%occurs(draw_line(#obj,#co,#co,#co,#co),frame(I)).   

holds(#fluent,#frame).



rules
draw_line(square,50,50,50,100).
draw_line(square,50,100,100,100).
draw_line(square,100,100,100,50).
draw_line(square,50,50,100,50).

draw_quad_curve(curve, 10, 10, 50, 50 ,100, 50). 
%draw_bezier_curve(curve, 10,10 ,50,100 ,100,10,150,50).
draw_arc_curve(curve,50,50,50,1,8). 


%occurs(drawing(...), frame(I)
%busyFrame(B1, B2, frame(I)) :- totalFrame > D, Delta=totalFrames/D (float number), I< Delta*I <=I+1.
%idleFrame(B1, B2, frame(I)) :- not busyFrame(B1, B2, frame(I)).


