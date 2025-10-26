package com.eventmate.backend.controllers;

import com.eventmate.backend.service.ProjectKnowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/project-qa")
@CrossOrigin(origins = "*")
// नया और स्पष्ट endpoint
public class ProjectQaController {

    private final ProjectKnowledgeService knowledgeService;

    // सुनिश्चित करें कि आपने पहले ProjectKnowledgeService.java फाइल बना ली है
    // जैसा कि पिछले उत्तर में बताया गया था।
    @Autowired
    public ProjectQaController(ProjectKnowledgeService knowledgeService) {
        this.knowledgeService = knowledgeService;
    }

    @PostMapping("/ask")
    public Map<String, String> askProjectExpert(@RequestBody Map<String, String> request) {
        String question = request.get("query");
        String answer = knowledgeService.getAnswer(question); // यह ProjectKnowledgeService से आता है
        
        Map<String, String> response = new HashMap<>();
        response.put("answer", answer);
        return response;
    }
}
